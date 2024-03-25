# vinyl-shop--react-FE

## Front end of mock vinyl shop app developed in React

## Deployed on: [surge](http://obsolete-crime.surge.sh/)

## N.B. The BE provides far more endpoints than the ones utilized here. This app can be developed further, mainly but not only by providing admin interface for manipulation the DB

### If cloned from previous project - Update dependencies  

***(see note below first)***

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
  
***Or simply using npx, so you don't have to install anything globally:***

```js
npx npm-check-updates -u  
npm install
```

## Deployment @ Surge

```npm run build```

To install Surge CLI globally:  
```npm install -g surge```

Run surge inside the build folder.

```
cd build
surge
```

Follow the prompts. First, you’ll be asked for an email and password.

Welcome to surge! (surge.sh)
Login (or create surge account) by entering email & password.
      email: admin@ashusingh.me
      password:

Before filling in any other prompts, it’s a good idea to confirm your Surge account.

Verify your email to create your Surge account

In the terminal, you’ll be asked to confirm your project directory. Hit Enter.

You’ll see the domain of your project. Again, hit Enter.   

**If OVERWRITING existing project, just overwrite suggested url with actual url of your project (obsolete-crime.surge.sh)**  

**DON'T forget to direct to build folder**  

    project: /home/kk/GitHub/vinyl-shop--react-FE/
    obsolete-crime.surge.sh 

This will publish your application.

   Success! - Published to ahead-cannon.surge.sh
   

## Implementation Notes

- 'index.js' renders:

```js
<CartContextProvider>
 <AuthContextProvider >
  <App />
 </AuthContextProvider>
</CartContextProvider>
```

- app.js contains all routes including `< RootLayout />`.  
Some routes use deferred loaders in order to use the `Suspense/Await` syntax.  
This does not always work as **I** expected - when already in /search and search again spinner does not render.  It looks the reason for this is that the Promise form previous request remains resolved.  

- `AuthContextProvider` is implemented without a reducer, `CartContextProvider` sends cart actions to cartReducer.js:

```js
const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        initializer());
```

Purpose of initializer() argument - comment in file
- `< RootLayout />` will render modals on top of html if any of them is enabled (state is *visible*)

```js
            {/* render modals if enabled */}
            {loginModalVisible && <LogInModal />}
            {registerModalVisible && <RegisterModal />}
            {cartModalVisible && <Cart />}

            <Header />
            {/* Outlet will render a <main> component depending on the route selected */}
            <Outlet />

```

- Most modals inherit from <Modal>, exception is CartModal which has different styling as the Modal, e.g. needs to be wider  

- Orders page will receive from the BE a massive array with essentially album_purchase entries. This is an intermediary table between album and purchase (avoiding many2many). In other words for every album bought by anyone we get an element in our array.  
The element also contain all the essential data to construct order objects where the raw data will be aggregated. 

```js
let aggregatedArray = []
    if (orders) {
        for (let originalObj of orders) {
            const foundItem = aggregatedArray.find(item => item.purchase_id === originalObj.purchase_id);
            if (!foundItem) {
                // if not in aggregatedArray ->> process data
                const { album_info, ...rest } = originalObj
                let newObj = { ...rest };
                newObj.album_array = [];
                (newObj.album_array).push(album_info);
                aggregatedArray.push(newObj);
            }
            else {
                (foundItem.album_array).push(originalObj.album_info);
            }
        }
    }
```

# Backend is deployed at: [render](https://vinyl-shop.onrender.com/).

## TODOS

- DONE: Google log in
- async errors handling
- fix `Suspense/Await` bug, see above
- DONE fix structure - What is UI, what is page, what is components? Probably separate modals folder  XXXX
- testing
