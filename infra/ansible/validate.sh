#!/bin/bash
# Day 6 validation: checks helm-values.yml and grafana-dashboard.json
cd /mnt/c/Users/xxkil/Downloads/QUESS-main/QUESS-main/infra/monitoring

echo "=== Helm values YAML syntax ==="
python3 -c "
import yaml
with open('helm-values.yml') as f:
    data = yaml.safe_load(f)
sections = list(data.keys())
print('Sections:', sections)
print('OK: helm-values.yml is valid YAML')
"

echo ""
echo "=== Grafana dashboard JSON syntax ==="
python3 -c "
import json
with open('grafana-dashboard.json') as f:
    data = json.load(f)
print('Title:', data['title'])
print('Panels:', len(data['panels']))
print('UID:', data['uid'])
print('OK: grafana-dashboard.json is valid JSON')
"

echo ""
echo "Done."
