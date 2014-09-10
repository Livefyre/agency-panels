require.config({
    paths: {
        jquery: "../lib/jquery/dist/jquery.min"
    },
    packages: [{
        name: 'agency-panels',
        location: '../src'
    }],
    shim: {
        jquery: {
            exports: "$"
        }
    } 
});