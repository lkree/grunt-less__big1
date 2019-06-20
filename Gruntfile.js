module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          'build/css/style.css': 'src/less/style.less'
          // 'build/css/lax-tecDoc-pages/style.css' : 'src/css/lax-tecDoc-pages/style.less'
          // 'build/css/delivery/delivery--style.css' : 'src/css/delivery/delivery--style.less'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'build/css/style.css': 'build/css/style.css'
          // 'build/css/lax-tecDoc-pages/style.css' : 'build/css/lax-tecDoc-pages/style.css'
          // 'build/css/delivery/delivery--style.css' : 'build/css/delivery/delivery--style.css'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 11']
      },
      target: {
        files: {
          'build/css/style.css': 'build/css/style.css'
          // 'build/css/lax-tecDoc-pages/style.css' : 'build/css/lax-tecDoc-pages/style.css'
          // 'build/css/delivery/delivery--style.css' : 'build/css/delivery/delivery--style.css'
        }
      },
    },
    watch: {
      css: {
        files: ['src/css/*.less', "src/css/blocks/*.less"],
        tasks: ['cssmin', 'less']
      },
      html: {
        files: 'build/index.html'
      }
    },
    uglify: {
      // mainPage: {
      //   src: 'build/js/main-page-script.js',
      //   dest: 'build/js/main-page-script.js'
      // },
      // anyAutosPage: {
      //   src: 'build/js/any-autos-page-script.js',
      //   dest: 'build/js/any-autos-page-script.js'
      // },
      // autosPage : {
      //   src: 'build/js/autos-page-script.js',
      //   dest: 'build/js/autos-page-script.js'
      // },
      delivery: {
        src: 'build/js/delivery-page-script.js',
        dest: 'build/js/delivery-page-script.js'
      }
    },
    "babel": {
      options: {
        // sourceMap: true
      },
      dist: {
        files: {
          // "build/js/main-page-script.js" : "build/js/main-page-script.js",
          // "build/js/any-autos-page-script.js": "build/js/any-autos-page-script.js",
          // "build/js/autos-page-script.js": "build/js/autos-page-script.js",
          'build/js/delivery-page-script.js' : 'build/js/delivery-page-script.js'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      // mainPage: {
      //   src: [
      //     'src/js/main-page/loading.js',
      //     'src/js/main-page/href-checker.js',
      //     'src/js/main-page/laximoGetter.js'
      //     ],
      //   dest: 'build/js/main-page-script.js'
      // },
      // anyAutosPage: {
      //   src: 'src/js/any-autos-page/vinAutoInfoGetter.js',
      //   dest: 'build/js/any-autos-page-script.js'
      // },
      // autosPage: {
      //   src: [
      //     'src/js/autos-page/cars.js',
      //     'src/js/autos-page/carsTO.js',
      //     'src/js/autos-page/tecDocUrlGetter.js',
      //     'src/js/autos-page/tecDocUrlController.js'
      //     ],
      //   dest: 'build/js/autos-page-script.js'
      // },
      delivery: {
        src: [
          'src/js/delivery/template.js',
          'src/js/delivery/deliveryGetter.js',
          'src/js/delivery/delivery--autocomplete.js'
        ],
        dest: 'build/js/delivery-page-script.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask("default", ["babel"]);
};