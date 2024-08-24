module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // Other rules...
      ],
    },
    // Other configurations...
  };
  