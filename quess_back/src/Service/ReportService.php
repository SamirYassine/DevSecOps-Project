<?php


namespace App\Service;   

require_once '../assets/dompdf/autoload.inc.php';

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Air;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Zone;
use App\Entity\Localization;
use App\Entity\Surface;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;


class ReportService 

{
    private $doctrine;
    public $entityManager;

    public function __construct(ManagerRegistry $doctrine, EntityManagerInterface $entityManager)
    {
        $this->doctrine = $doctrine;
        $this->entityManager = $entityManager;
    }

    public function ReviseReport(int $id, array $data ): Response
    {
        
        $formType = $data['formType'];
        $recommendations = $data['recommendations'];
        // $circleSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="red" /></svg>';

        if ($formType === 'Surface') {
            $surface = $this->entityManager->getRepository(Surface::class)->find($id);
            if (!$surface) {
                throw $this->createNotFoundException('Surface entity not found');
            }
            
            $surface->setRecommendations($recommendations);
            $surface->setStatus(true);
            $this->entityManager->persist($surface);
            $this->entityManager->flush();
        } elseif ($formType === 'Air') {
            $air = $this->entityManager->getRepository(Air::class)->find($id);

        if (!$air) {
            throw $this->createNotFoundException('Air entity not found');
        }
        $air->setRecommendations($recommendations);
        $air->setStatus(true);

        $this->entityManager->persist($air);
        $this->entityManager->flush();

    }
    return new JsonResponse('Report revised successfully');
    }


    public function GenerateRevisedReport(int $id, string $formType ): Response
    {
        

        

        if ($formType === 'Surface') {
            $surface = $this->entityManager->getRepository(Surface::class)->find($id);
            if (!$surface) {
                throw $this->createNotFoundException('Surface entity not found');
            }
            $organization = $surface->getOrganization();
            $orgName = $organization->getNomOrg();
            $orgAddress = $organization->getAdresse();
            $detailsSurfaceData = $surface->getDetails();
            $recommendations = $surface->getRecommendations();
            $this->entityManager->persist($surface);
            $this->entityManager->flush();
            $caption ='Surface sampling results';


            // Fetch names associated with zone IDs
            $zoneIds = array_column($detailsSurfaceData, 'zone');
            $zoneNames = $this->entityManager->getRepository(Zone::class)->findBy(['id' => $zoneIds]);
            $zoneNameMap = [];
            foreach ($zoneNames as $zone) {
                $zoneNameMap[$zone->getId()] = $zone->getName();
            }

            // Fetch names associated with localization IDs
            $localizationIds = array_column($detailsSurfaceData, 'localization');
            $localizationNames = $this->entityManager->getRepository(Localization::class)->findBy(['id' => $localizationIds]);
            $localizationNameMap = [];
            foreach ($localizationNames as $localization) {
                $localizationNameMap[$localization->getId()] = $localization->getName();
            }



        } elseif ($formType === 'Air') {
            $air = $this->entityManager->getRepository(Air::class)->find($id);

        if (!$air) {
            throw $this->createNotFoundException('Air entity not found');
        }
        $organization = $air->getOrganization();
        $orgName = $organization->getNomOrg();
        $orgAddress = $organization->getAdresse();
        $detailsAirData = $air->getDetailsAir();
        $recommendations = $air->getRecommendations();
        $this->entityManager->persist($air);
        $this->entityManager->flush();

        $caption ='Air sampling results';

        // Fetch names associated with zone IDs
        $zoneIds = array_column($detailsAirData, 'zone');
        $zoneNames = $this->entityManager->getRepository(Zone::class)->findBy(['id' => $zoneIds]);
        $zoneNameMap = [];
        foreach ($zoneNames as $zone) {
            $zoneNameMap[$zone->getId()] = $zone->getName();
        }

        // Fetch names associated with localization IDs
        $localizationIds = array_column($detailsAirData, 'localization');
        $localizationNames = $this->entityManager->getRepository(Localization::class)->findBy(['id' => $localizationIds]);
        $localizationNameMap = [];
        foreach ($localizationNames as $localization) {
            $localizationNameMap[$localization->getId()] = $localization->getName();
        }
        }
        $header = '
 <div style="display: flex; justify-content: space-between; ">
         <div class="alignleft" >'.$orgName.'</div>
        <div class="alignright">Report
        </div>  
    </div>
    
     <hr style="border: none; border-top: 1px solid black; margin-top: 50px;">
';
        // Create a new Dompdf instance
        $options = new Options();
        $options->set('defaultFont', 'opensans');
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);

        $dompdf = new Dompdf($options);
        $font = $dompdf->getFontMetrics()->get_font("opensans", "normal");
        $dompdf->getCanvas()->page_text(270, 820, "Page {PAGE_NUM} of {PAGE_COUNT}", $font, 10, array(0,0,0));
        // Set options for PDF rendering
        
        //$options->set('isHtml5ParserEnabled', true);
       // $options->set('isRemoteEnabled', true);
        //$dompdf->setOptions($options);
        



        // Load HTML content into Dompdf
        

        // Create HTML content for the PDF report
        $html = '
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Air Details Report</title>
                <style>
                    .highlighted-row {
                        background-color: #1D9DBA;
                        font-weight: bold;
                    }
                    .footer {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        background-color: #1D9DBA;
                        color: white;
                        text-align: center;
                        padding: 10px;
                    }
                    .line {
                border-top: 20px solid #1D9DBA; /* Adjust thickness here */
                margin-top: 10px; /* Adjust distance from previous element */
                margin-bottom: 10px; /* Adjust distance to next element */
            }
            .blue-title {
                color: #1D9DBA;
            }
            
            }
            .bold {
                font-weight: bold;
            }
            .break-after {
    page-break-after: always;
}
.rectangle {
                border: 2px solid #1D9DBA; /* Border color */
                padding: 10px; /* Padding inside the rectangle */
                margin-bottom: 20px; /* Margin below the rectangle */
            }
            .long-text {
                //font-size: 13px; /* Font size for the text */
            }

            .alignleft {
                float: left;
                margin-left: 10px;
                        }

            .alignright {
                float: right;
                margin-right: 10px;
                
                        }

                        
                </style>
                
            </head>
            <body>
            <hr class="line" >
                <img src="public\assets\images\quesscontrole.png" alt="Your Image" width="50%">
                <br>
                <h1 > ' . $orgName . '</h1>
                <h4>' . $orgAddress . '</h4>
                <br>
                <br>
                
                <h1 class="blue-title">Report</h1>
                <br>
                <h2> Air and surface viable sampling</h2>
                <h3>' . date('F j, Y') . '</h3>
                
                <div class="footer">
                    www.bcepharma.com
                </div>
                <div class="break-after"></div>
                <h2 class="blue-title">Acknowledgements</h2>
        <p>
            <span class="bold">BCE Pharma</span> would like to thank all those involved in the <span class="bold">BCE Pharma</span> TESTS for their collaboration.
        </p>
        
        <h2 class="blue-title">Disclaimer</h2>
        <p>
            This report is based on the latest version of OPQ standard 2014.01, Preparation of non-hazardous sterile products in pharmacies.
            preparation of non-hazardous sterile products in pharmacy, which is based on chapter 797 of the United States Pharmacopeia Convention (USP).
            Viable particle sampling was carried out in accordance with the rules of the art, regulations and government policies in force at the time of the study.
            government policies in effect at the time of sampling. Where no policies, criteria or regulations are available to permit interpretation of the data,
            comments and recommendations expressed by <span class="bold">BCE Pharma</span> are based on the best knowledge of accepted rules of professional practice.
            It is the customer"s responsibility to follow up on recommendations and regulatory changes. regulations.
        </p>
                        <div class="break-after"></div>
                <h2 class="blue-title">Limitations</h2>
        <p>Our analysis is limited to the sampling of viable particles from controlled areas and the
sterile preparation cabinet. The levels of microbial contamination or absence of microbial contamination
microbial contamination reported correspond to those detected at the location and date of
observation date indicated in this report. These conditions may vary according to the season or
as a result of activities at the site under study. The nature and degree of contamination between sampling points
sampling points may vary significantly depending on the conditions encountered
at the analysis site.</p>
<div class="rectangle">
            <p class="long-text">This report is the property of <span class="bold">BCE Pharma</span>.<br><br>
All rights are reserved and content may not be reproduced, downloaded, distributed, transferred
distributed, transferred or translated in any form or by any means, except for internal
except for <span class="bold">BCE Pharma</span> TESTS internal purposes specifically related to the execution of this
and transmission to the OPQ"s Professional Inspection Committee.<br><br>

No part of such content may, as a result, or subsequently, be
reproduced, downloaded, distributed, transferred or translated in any form or by any means
by any means, without written permission from <span class="bold">BCE Pharma</span>. In other words, for
internal and/or personal purposes, the customer or its stakeholders or suppliers may not
to compete with <span class="bold">BCE Pharma</span>, unless specifically agreed.<br><br>

Any use of this report by a third party, or any decision based on this report, is the responsibility of that person.
report shall be the responsibility of such person. <span class="bold">BCE Pharma</span> disclaims
for any damages of any kind or nature by any third party as a result of any
result of decisions or actions based on this report.</p>
</div>
<br>
<img src="public\assets\images\bcepharma.png" alt="Your Image" width="50%" position="center">
<div class="break-after"></div>
<h1 class="blue-title">Table of Contents</h1>
    <ul>
        <li><a href="#intro">Introduction </a></li>
        <li><a href="#descritpion">Site description</a></li>
        <li><a href="#method">Methodology
</a></li>
        <li><a href="#result">Results and analysis</a></li>
        <li><a href="#recomm">Recommendations</a></li>
        <li><a href="#ref">References</a></li> 
        <li><a href="#tables">Tables</a></li>
        <li><a href="#annexe">Annexe</a></li> 
    </ul>

    <div class="break-after"></div>    
    '. $header .'

    <h2 class="blue-title" id="intro" >Introduction</h2>
    <p>
    <span class="bold">BCE Pharma</span> has been mandated, as of 07 December 2023, to carry out sampling of viable particles
viable particles (bacteria, yeasts and molds) in the air and on surfaces in the sterile
BCE Pharma TESTS sterile hazardous drug preparation facilities. <br><br>

The main objectives of this expertise are as follows: 
<ul>
<li>Evaluate the concentration of viable particles in the air in the various
rooms in the controlled zones of the general sterile preparation area, including the
including sterile preparation cabinets.</li>
<li>Evaluate the presence of viable particles on surfaces at various locations in the
controlled areas of the general sterile preparation area, including sterile preparation
sterile preparation cabinets.</li>
<li>Determine whether the results obtained reach a level of microbial contamination that
requires action.</li>
</ul>
<br><br>

This report provides information relating to the fulfilment of this mandate. The report
includes a description of the site, the methodology used, the results of all tests and the
analysis. The appendices contain all the required certificates.<br><br>

In addition, the reader is invited to refer to previous <span class="bold">BCE Pharma</span>
for a complete overview of this environmental audit.

    </p>
    <div class="break-after"></div>
    <h2 class="blue-title" id="descritpion">Site description</h2>
    <div class="break-after"></div>
    <h2 class="blue-title" id="method">Methodology</h2>
    The two sampling methods used are :
    <br>
    <ul>
    <li><span class="bold">Impactor sampling</span>, which involves directing a stream of air onto an agar plate
on which particles are deposited by impact.</li>
<li><span class="bold">Surface sampling</span>, which consists of taking samples of particles
directly from surfaces, using dished agar. This technique makes it possible to
determine surface contamination and check the effectiveness of cleaning and disinfection
and disinfection protocols.</li>
    </ul>
    <br>

Viable particle sampling was carried out by a specialized sampling technician
sampling technician, who observed the conduct of personnel in sterile preparation areas
sterile preparations (see Annex A).<br><br>

Sampling was carried out in dynamic conditions, under normal sterile preparation operating conditions.
sterile preparation operations with the presence of the sampling technician
of <span class="bold">BCE Pharma</span> viable particles, simulating movement within the sterile preparation
the sterile preparation cabinets while the latter were in operation.<br><br>

Air and surface samples were analyzed by an independent laboratory, in a controlled environment respecting
Good Manufacturing Practice (GMP), accredited by Santé Canada.
    <div class="break-after"></div>


    <h2 class="blue-title" id="result">Results and analysis</h2>
    <div class="break-after"></div>    


    <h2 class="blue-title" id="recomm">Recommendations</h2>
    <p>'.$recommendations.'
    <div class="break-after"></div>


    <h2 class="blue-title" id="ref">References</h2>
    <ul>
    <li>
    Ordre des pharmaciens du Québec (OPQ) - Standard 2014.01 “Preparation of non-dangerous sterile products in pharmacies” revised on February 2023 <a href="https://www.opq.org/wp-content/uploads/2017/11/Norme_2014_01_Ste%CC%81rile_non-_dangereux-_Fe%CC%81v2023_Final.pdf">Visit PDF file </a> [visited on.' . date('F j, Y') .']

</li>
<br>
<li>United States Pharmacopeia Convention (USP) - General Chapter
<797>: Pharmaceutical Compounding Sterile Preparations.
<a href="https://online.uspnf.com/uspnf">Visit USP website </a> [consulted on '.date('F j, Y') .']</li></ul>
    
    <div class="break-after"></div>
    <h2 class="blue-title" id="tables">Tables</h2>
    <br>
                <caption style="font-weight: bold; font-style: italic;"> Table 1 : ' . $caption.'</caption><br>
                <table border="1"> 
                    <thead>
                        <tr>
                            <th># Ech</th>
                            <th>Zone</th>
                            <th>Localization</th>
                            
                            <th>ISO</th>
                            <th>UFC Agar Numbers</th>
                            <th>Threshold Action Required</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>';
$counter = 1;
        // Extract data from the details_air array and add to the table
        if ($formType ==='Air'){
        foreach ($detailsAirData as $item) {
            $html .= '<tr>';
            $html .= '<td>' . $counter . '</td>';
            $html .= '<td>' . $item['zone'] . '</td>';
            $html .= '<td>' . $item['localization'] . '</td>';
            // $html .= '<td>' . $item['samplerUsed'] . '</td>';
            $html .= '<td>' . $item['iso'] . '</td>';
            $html .= '<td>' . $item['ufcAgarNumbers'] . '</td>';           
            $html .= '<td>' . $item['thresholdActionRequired']  . '</td>';
            $html .= '<td>' . $item['comments'] . '</td>';
            $html .= '</tr>';
            
            $counter++;
        }}
    
    elseif ($formType ==='Surface'){
        foreach ($detailsSurfaceData as $item) {
            $html .= '<tr>';
            $html .= '<td>' . $counter . '</td>';
            $html .= '<td>' . $item['zone'] . '</td>';
            $html .= '<td>' . $item['localization'] . '</td>';
            $html .= '<td>' . $item['iso'] . '</td>';
            $html .= '<td>' . $item['ufcAgarNumbers'] . '</td>';           
            $html .= '<td>' . $item['thresholdActionRequired']  . '</td>';
            $html .= '<td>' . $item['comments'] . '</td>';
            $html .= '</tr>';
            $counter++;
        }
    }

        // Close the HTML table
        $html .= '
                    </tbody>
                </table>
                
            </body>
            </html>
        
    <div class="break-after"></div>
    <h2 class="blue-title" id="annexe">Annexe</h2>
    <div class="break-after"></div>';

                
        $dompdf->loadHtml($html);

// Render PDF
$dompdf->render();

// Get the PDF content as a string
$pdfContent = $dompdf->output();

// Set the file path and name for saving the PDF on the server
$outputDir = 'C:\Users\xxkil\Quess\quess_back\public\PDFs\\';
$currentDateTime = date('Y-m-d H-i-s'); // Get current date and time
$titlePdf = $orgName . ' Report ' . $currentDateTime;
$pdfFilePath = $outputDir . str_replace(['é', 'ô'], ['e', 'o'], $titlePdf) . '.pdf';

// Save the PDF file on the server
file_put_contents($pdfFilePath, $pdfContent);

// Prepare the response with the download link
$response = new JsonResponse([
    "link" => "public/PDFs/" . $titlePdf . ".pdf",
    "fileName" => $titlePdf . ".pdf",
    Response::HTTP_OK
]);

// Set the Content-Disposition header to prompt download
$response->headers->set('Content-Disposition', 'attachment; filename="document.pdf"');

// Return the response
return $response;
    }
}

