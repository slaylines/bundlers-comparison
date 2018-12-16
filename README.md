## Description

Performance and usage comparison of Webpack 4, Parcel and Rollup bundlers.

All bundlers were used for a big enough open-source [SoundCloud app](https://github.com/rwieruch/favesound-redux) implemented in React. The app was slightly tweaked so that it could work similarly with all the bundlers.

This comparison doesn't pretend to be objective and was done for personal purpose only. I didn't try to setup the most optimized output results for each bundler. I used minimal setup for the comparison. If you feel that you can improve results please send PRs.

## Machine Specs

| Attribute | Description                             |
|-----------|-----------------------------------------|
| Name      | MacBook Pro (Retina, 15-inch, Mid 2015) |
| Processor | 2,2 GHz Intel Core i7                   |
| Memory    | 16 GB 1600 MHz DDR3                     |
| Graphics  | Intel Iris Pro 1536 MB                  |
| OS        | macOS Mojave v10.14                     |

## Bundle Size

Here are the results for production JavaScript bundle size.

| Bundler | Minified | Gzipped |
|---------|----------|---------|
| Webpack | 709 kB   | 192 kB  |
| Parcel  | 687 kB   | 180 kB  |
| Rollup  | 464 kB   | 139 kB  |

## Development Build

Here are the results for development build times. For Parcel there are two values for start since it has built-in cache. All the values is an average over 10 runs.

| Bundler |       Start       | Reload  |
|---------|-------------------|---------|
| Webpack | 5226 ms           | 967 ms  |
| Parcel  | 8488 ms (2445 ms) | 692 ms  |
| Rollup  | 12230 ms          | 3840 ms |

## Production Build

Here are the results for production build times. For Parcel and Webpack there are two values since both have cache. Webpack has cache for [Terser Plugin](https://github.com/webpack-contrib/terser-webpack-plugin). All the values is an average over 10 runs.

| Bundler |        Time        |
|---------|--------------------|
| Webpack | 15421 ms (4686 ms) |
| Parcel  | 11192 ms (1271 ms) |
| Rollup  | 16440 ms           |

## Usage Notes

All of the bundlers require Babel to build JavaScript properly. Here are the common packages for all the bundlers:

```
@babel/core
@babel/register
@babel/preset-react
@babel/preset-env
node-sass
```

### Webpack

Webpack is probably the most solid option for app development. Especially when v4 is out. It cuts a good chunk of boilerplate from config comparing to v3.

Webpack doesn't require much dependencies. You'll mostly need plugins and loaders installed additionally. Last time Webpack documentation was improved a lot, so it's easy to achieve what you need.

While the configuration part is confusing at first, it's actually becomes a lot easier when you are familiar with the main concepts.

There are plugins for literally everything you need. It's much more flexible than Parcel and it's less complicated to setup than Rollup.

##### Dependencies:

```
webpack
webpack-cli
webpack-dev-server
babel-loader
style-loader
css-loader
sass-loader
```

### Parcel

This is probably the easiest one to setup. Only one dependency was required to bundle the app. And zero config for both development and production.

It also has a nice cache feature built-in. So for the subsequent runs it bundles faster than for the cold run. Though sometimes it's buggy and you need to clear cache in order to get proper build result.

While it sounds very cool, in reality Parcel may be very limiting in some usage scenarios. For example, there is no control over hierarchy of output files. When you need to accomplish something specific, there may be no way to do so. It also seems to be less reliable than the others since it's quite new comparing to the others.

##### Dependencies:

```
parcel-bundler
```

### Rollup

It was really painful to setup Rollup for this particular app. It required tons of plugins to be installed in order to achieve the same result as the other bundlers. I didn't figure out how to bundle Soundcloud's libraries properly with Rollup, so I had to move them out of the bundling pipeline.

Overall it's just too complicated. It requires a very careful setup. It may be a good thing for experienced developers though, since it's a very minimalistic tool, it doesn't bloat your bundle without a reason.

There is a rule of thumb that Rollup should be used for libraries. I would agree, but it has a potential to become a good choice for apps too, if it would have sane defaults as Webpack has. It also should be more clear how to deal with CommonJS modules, because for the first-time users it's very confusing.

##### Dependencies:

```
rollup
rollup-plugin-babel
rollup-plugin-commonjs
rollup-plugin-json
rollup-plugin-livereload
rollup-plugin-node-resolve
rollup-plugin-progress
rollup-plugin-re
rollup-plugin-replace
rollup-plugin-scss
rollup-plugin-serve
rollup-plugin-uglify
rollup-plugin-visualizer
```

## Conclusion

- Use Webpack 4 by default. It's flexible and user-friendly enough for app development. There is a learning curve, but once you get it, it's not very complicated to use. The documentation became a lot better last time and the community is very big.
- Use Parcel for simple scenarios. It's easy to setup and very fast. It's also a good option for beginners. Don't use it if you wish to do customizations and tweaks for your builds, in the long term it may cause problems. The documentation may lack some of the important details and it's a pain to fix little quirks. It's also still immature, so expect to face with bugs.
- Use Rollup for library development and if bundle size is something very critical for you. The developer's experience is not the best here and you need to understand the tradeoffs for a small bundle size and minimalistic philosophy behind it. It's a solid tool though. The documentation would be better if it could provide more real-life examples of usage for common scenarios.
