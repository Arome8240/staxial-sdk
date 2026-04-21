#!/bin/bash

echo "�� Publishing staxial-sdk to npm..."
echo ""

# Check if logged in
echo "Checking npm login status..."
npm whoami || { echo "❌ Not logged in to npm. Run 'npm login' first."; exit 1; }

echo ""
echo "✅ Logged in as: $(npm whoami)"
echo ""

# Show what will be published
echo "📦 Package contents:"
npm pack --dry-run

echo ""
read -p "Do you want to publish staxial-sdk@0.2.0 to npm? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    echo "Publishing..."
    npm publish
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Successfully published staxial-sdk@0.2.0!"
        echo ""
        echo "📝 Next steps:"
        echo "1. Create git tag: git tag v0.2.0"
        echo "2. Push tag: git push origin v0.2.0"
        echo "3. Verify: npm view staxial-sdk"
        echo "4. Test install: npm install staxial-sdk"
    else
        echo ""
        echo "❌ Publishing failed. Check the error above."
    fi
else
    echo ""
    echo "❌ Publishing cancelled."
fi
