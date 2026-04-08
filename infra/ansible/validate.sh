#!/bin/bash
# Validate Day 2 deliverables
cd /mnt/c/Users/xxkil/Downloads/QUESS-main/QUESS-main

echo "=== Pipeline YAML syntax ==="
python3 -c "
import yaml
with open('.github/workflows/devsecops.yml') as f:
    data = yaml.safe_load(f)
jobs = list(data.get('jobs', {}).keys())
print('Jobs found:', jobs)
print('OK: devsecops.yml is valid YAML')
"

echo ""
echo "=== Backend Dockerfile ==="
if grep -q "FROM.*AS deps" quess_back/Dockerfile; then
    echo "OK: Multi-stage build detected"
else
    echo "WARN: No multi-stage build"
fi
if grep -q "apt-get clean" quess_back/Dockerfile; then
    echo "OK: apt cache cleanup present"
fi
if grep -q "USER www-data" quess_back/Dockerfile; then
    echo "OK: Non-root user set"
fi

echo ""
echo "=== .dockerignore files ==="
for dir in quess_back quess_front; do
    if [ -f "$dir/.dockerignore" ]; then
        lines=$(wc -l < "$dir/.dockerignore")
        echo "OK: $dir/.dockerignore exists ($lines lines)"
    else
        echo "MISSING: $dir/.dockerignore"
    fi
done

echo ""
echo "Done."
