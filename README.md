# vinyl-shop--react-FE

Front end of mock vinyl shop app developed in React

## Update dependencies if cloned from previous project

`npm outdated` will identify packages that should be updated, and `npm update <package name>` can be used to update each package. But prior to npm@5.0.0, `npm update <package name>` will not update the versions in your package.json which is an issue.  

The best workflow is to:  

1. Identify out of date packages with `npm outdated`
2. Update the versions in your package.json
3. Run `npm update` to install the latest versions of each package

---

Check out npm-check-updates to help with this workflow.

- Install npm-check-updates with npm i npm-check-updates -g
- Run `npm-check-updates` to list what packages are out of date (basically the same thing as running npm outdated)
- Run npm-check-updates -u to update all the versions in your package.json (this is the magic sauce)
- Run npm update as usual to install the new versions of your packages based on the updated package.json

***Or more simply using npx, so you don't have to install anything globally:***

```
npx npm-check-updates -u  
npm install
```
