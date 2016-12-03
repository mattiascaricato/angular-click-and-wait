# angular-click-and-wait
Simple angular directive to prevent user from clicking multiple times on a element when performing an asynchronous action.

## Install
Install with npm or bower

- npm
    
    `npm install --save click-and-wait`

- Bower
    
    `bower install --save click-and-wait`

## Usage
1. Add the `clickAndWait` directive as a dependency for your app

    ```javascript
    angular.module('myApp', ['clickAndWait']);
    ```
    
2. Use the `clickAndWait` directive in any element

    ```html
    <button click-and-wait="asyncAction()"></button>
    ```

The asynchronous action passed as argument should be a `Promise`. 


## Contributing

### Dependencies
- `npm`
- `yarn`

Run `yarn install` to install dependencies

### Development

1. Fork it!
2. Create your feature branch `git checkout -b feature/my-new-feature`
4. run `yarn tdd`
5. Write ES6/ES2015+ code using the [Airbnb Style Guide](https://github.com/airbnb/javascript)
6. run `yarn build` to build the new version
7. Commit your changes: `git commit -am 'Add some feature'`
8. Push to the branch: `git push origin feature/my-new-feature`
9. Submit a pull request 😁

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
