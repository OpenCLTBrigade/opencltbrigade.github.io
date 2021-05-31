# Open Charlotte Official Website

## Get Running

There are two parts to running and developing the Open Charlotte website locally. First is a static site generator called [Jekyll](https://jekyllrb.com/), the other side is the JavaScript bundle that contains [React](https://facebook.github.io/react) components.

### Pre-requisites

- NodeJS
  - Consider using [Node Version Manager](https://github.com/nvm-sh/nvm). Andrew uses Node >= 8.9.4
- Ruby
  - Consider using [Ruby Version Manager](https://rvm.io/rvm/install). Versions `2.6` and `2.8` seem to work.

Once Ruby is set up you'll need `bundler` and `jekyll` on your system.

```
gem install bundler jekyll
```

You'll also need the `webpack` and `webpack-cli` node modules installed globally.

```
npm install -g webpack webpack-cli
```

Then clone the project repository. Go into its directory, pull the submodules, install gems, and run the site.

```
cd /path/to/project/directory
git submodule update --init --recursive
bundle install
webpack
bundle exec jekyll serve
```

---

## Developing

Branch off of and submit pull requests to the `release` branch. The `master` branch is used by GitHub pages and only contains the latest build artifacts created during deployment.

### Jekyll Development

This will likely consist of the bulk of development work. To run Jekyll and view your changes locally, run

```
bundle exec jekyll serve
```

You can view the site locally at `http://localhost:4000` by default. 

### React Development

To automatically build the JavaScript bundles while working on them, run 

```
webpack --watch
```

If you're running the Jekyll serve command, Jekyll will automatically pick up the new JavaScript bundles and reload.

The JavaScript bundles are split into three types of files:

- `vendor.js` - Third party libraries are here
- `common.js` - Custom libraries and React components that get used across multiple views are here.
- View bundles - More on this below!

#### View Bundles

In order to attach specific React components to a specific Jekyll page we need to load components onto that page and render them with `ReactDOM.render`.

For example, if you want to add React to the `/about` page, create a new file, `/_react/views/AboutView.jsx`.

In there, import the relevant components and libraries you need, then attach them to an element that exists in the Jekyll template for that page using something like:

```
ReactDOM.render(<AboutComponent/>, document.querySelector("#section-for-component"));
```

Now that you've created your view file, open `/webpack.config.js`. In the `entry` object, add another property for your AboutView. The key is what you want the bundle file to be called and the value is the path to that file we just made. So we add...

```
AboutView: './_react/views/AboutView',
```

Restart webpack and we'll now get a `/js/react/AboutView.js` bundle.

Open the Jekyll template for the about page (`about.html` or whatever), and in the page properties, add:

```
js_view: AboutView
```

Jekyll will now automatically import your `AboutView` bundle to that page and your component(s) will be mounted.


---

## Build and Deployment
The `release` branch is built by TravisCI and the build assets are deployed to an orphaned `master` branch which is picked up and hosted by GitHub Pages.

The build command if you want to try it locally or manage the CI system is `npm run build` which will build the JavaScript bundles and then generate static HTML from Jekyll.

Generated JS gets added to `/js/react` which is ignored by git during development. Since our CI process pushes the build artifacts to the repository, we swap out `.gitignore` with `.gitignore.production` before deployment to ensure the JS bundle gets included.

Jekyll creates a `_site` directory that contains all of the build artifacts. In the `.travis.yml` file we tell TravisCI to deploy this directory and omit the source files as they're not needed by GitHub Pages.

---

## Contributing

Bug reports, content suggestions, and pull requests welcome. Please use the [issue tracker](https://github.com/OpenCLTBrigade/opencltbrigade.github.io/issues) in our GitHub repository to submiit feedback and track tasks in progress.

Please refer to the "Get Running" and "Developing" guides in this readme to contribute code or content.
