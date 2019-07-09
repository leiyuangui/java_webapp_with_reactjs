### Java Web Application with npm + webpack Setup

As the JavaScript world is moving towards using build tools to bundle JS code with tons of dependencies, the traditional paradigm of Java web application development, where JS files are being simply included into  web templates and copied over to the build artifact, is no longer working well. 

More specifically, there are two issues. One is that how to incorporate the front-end build tools into our Maven pom.xml, so that we can build everything into our beloved war file.  The other is that how to enable hot deployment for our front-end changes, so that we don't have to restart the dev server for every changes we made.

This is a sample setup that I used to overcome these issues. I am using plain Java Servlets at backend and ReactJS/Redux as the frontend stack.

### How to run

1. clone this git repository
2. change to the project folder
3. Fire up your faviourite IDE and import the maven project;
4. Run "mvn jetty:run" to fire up a jetty server.  It works at http://localhost:8080
5. At the project folder command line, run "npm start" to start the webpack dev server. It works at http://localhost:9090
6. Open up your browser, access the web application at http://localhost:9090
7. Run "mvn clean install" to build a deployable war file.

### Under the hood

#### Maven frontend plugin

This setup uses the frontend-maven-plugin (https://github.com/eirslett/frontend-maven-plugin) to enable the building of front-end dependencies. 

```xml
<plugin>
				<groupId>com.github.eirslett</groupId>
				<artifactId>frontend-maven-plugin</artifactId>
				<version>1.7.6</version>
				<configuration>
					<nodeVersion>v10.6.0</nodeVersion>
					<npmVersion>6.1.0</npmVersion>
					<installDirectory>.</installDirectory>
					<workingDirectory>.</workingDirectory>
				</configuration>
				<executions>
					<execution>
						<id>install node and npm</id>
						<goals>
							<goal>install-node-and-npm</goal>
						</goals>
					</execution>
					<execution>
						<id>npm install</id>
						<goals>
							<goal>npm</goal>
						</goals>
						<configuration>
							<arguments>install</arguments>
						</configuration>
					</execution>
					<execution>
						<id>webpack build</id>
						<goals>
							<goal>webpack</goal>
						</goals>
					</execution>
				</executions>
			</plugin>
```

#### Webpack configuration

Working with package.json, the following configuration specifies that it will build files with .js/.jsx extensions and use babel loader to load jsx files. The output file name will be app-bundle.js and the output folder is target/java_webapp_with_reactjs/assets/.

```js
var webpack = require('webpack')
var path = require('path')
var package = require('./package.json')

const common = {
  entry: {
    app: './src/main/jsx/index.jsx'
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'target/' + package.name + '/assets'),
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
```

With this setup,  the bundled js file can be simply included into index.jsp: 

```jsp
   <body>
        <div id="app"></div>
        <script type="text/javascript" src="<%=request.getContextPath()%>/assets/app-bundle.js"></script>
  </body>
```



#### Webpack dev server settings for hot deployment

These settings (in  webpack.config.js) define the devServer port and the proxy settings. The proxy configuration is crucial for enabling front-end changes to be automatically refreshed in browser. The proxy target is the embedded jetty server, which watches code changes at backend side. With this setup, accessing http://localhost:9090 would have all the changes from both frontend and backend. 

```js
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devServer: {
            port: 9090,
            proxy: {
                '/': {
                    target: 'http://localhost:8080/',
                    secure: false,
                    prependPath: false
                }
            },
            publicPath: 'http://localhost:9090/assets/',
            historyApiFallback: true
        },
        devtool: 'source-map'
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {});
}

```



