
require('./world.js');

//require('style-loader!css-loader!./index.css');//指定loader

require('./index.css');//这样就需要在命令行指定loader .\node_modules\.bin\webpack hello.js hello.bundle.js --module-bind ‘css=style-loader!css-loader’

require.ensure(['./world2.js'],function(require){
	
});

function hello(){
	return 'hello---------';
}
