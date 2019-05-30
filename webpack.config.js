const path = require('path');

module.exports = {
  entry: {
    TestView: './react/views/TestView',
    TestView2: './react/views/TestView2',
  },
  output: {
    path: path.join(__dirname, "/js/react"),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "react")
        ]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  optimization: {
		splitChunks: {
			cacheGroups: {
				common: {
					chunks: "initial",
					minChunks: 2,
          maxInitialRequests: 5,
          name: "common",
					minSize: 0
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	}
};