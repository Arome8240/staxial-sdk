# Publishing Guide

This guide explains how to publish the staxial-sdk package to npm.

## Prerequisites

1. **npm Account**: You need an npm account. Create one at [npmjs.com](https://www.npmjs.com/signup)

2. **npm Login**: Login to npm from your terminal:
   ```bash
   npm login
   ```
   Enter your username, password, and email when prompted.

3. **Two-Factor Authentication**: If you have 2FA enabled, you'll need your authentication code.

## Pre-Publishing Checklist

- [x] All tests pass
- [x] Linting passes with no errors
- [x] Build succeeds
- [x] Version number updated in package.json
- [x] CHANGELOG.md updated
- [x] README.md updated with new features
- [x] All changes committed to git

## Publishing Steps

### 1. Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

This shows you exactly what files will be included in the package.

### 2. Test the Package Locally (Optional)

Create a tarball and test it locally:

```bash
npm pack
```

This creates a `staxial-sdk-0.2.0.tgz` file. You can install it in another project to test:

```bash
cd /path/to/test-project
npm install /path/to/staxial-sdk/staxial-sdk-0.2.0.tgz
```

### 3. Publish to npm

#### Option A: Publish Directly

```bash
npm publish
```

#### Option B: Publish with Tag (Recommended for first release)

For a beta or test release:

```bash
npm publish --tag beta
```

For production release:

```bash
npm publish --tag latest
```

### 4. Verify Publication

After publishing, verify the package:

```bash
npm view staxial-sdk
```

Check the package page: https://www.npmjs.com/package/staxial-sdk

### 5. Create Git Tag

Tag the release in git:

```bash
git tag v0.2.0
git push origin v0.2.0
```

## Post-Publishing

1. **Test Installation**: Install the package in a new project to verify:
   ```bash
   npm install staxial-sdk
   ```

2. **Update Documentation**: Ensure all documentation references the correct version.

3. **Announce**: Share the release on relevant channels.

## Troubleshooting

### "You do not have permission to publish"

- Make sure you're logged in: `npm whoami`
- Check if the package name is available: `npm view staxial-sdk`
- If the package exists and you're not the owner, you'll need to use a different name

### "Package name too similar to existing package"

- npm may reject names that are too similar to existing packages
- Consider using a scoped package: `@your-username/staxial-sdk`

### "Version already exists"

- You cannot republish the same version
- Bump the version number in package.json and try again

## Using Scoped Packages (Alternative)

If you want to publish under your username or organization:

1. Update package.json:
   ```json
   {
     "name": "@your-username/staxial-sdk",
     ...
   }
   ```

2. Publish with public access:
   ```bash
   npm publish --access public
   ```

## Automated Publishing with GitHub Actions

For automated publishing, you can set up GitHub Actions. Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Then add your npm token to GitHub Secrets:
1. Generate token at https://www.npmjs.com/settings/tokens
2. Add it to GitHub repo secrets as `NPM_TOKEN`

## Version Management

Follow semantic versioning:

- **Patch** (0.2.1): Bug fixes
- **Minor** (0.3.0): New features, backward compatible
- **Major** (1.0.0): Breaking changes

Update version:
```bash
npm version patch  # 0.2.0 -> 0.2.1
npm version minor  # 0.2.0 -> 0.3.0
npm version major  # 0.2.0 -> 1.0.0
```

## Support

For issues with publishing, contact npm support or check their documentation:
- https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
