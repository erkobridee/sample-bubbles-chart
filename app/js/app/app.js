//clear all datas
//localStorage.clear();

window.KeyWord = Backbone.Model.extend({
  localStorage: new Backbone.LocalStorage("keyword")
});

window.IgnoreWord = Backbone.Model.extend({
  localStorage: new Backbone.LocalStorage("ignoreword")
});

window.IndexView = Backbone.View.extend({
    tagName: 'div',
    className: 'row-fluid',
    template:_.template($('#index').html()),
    keyWord: new KeyWord({id: 1}),
    ignoreWord: new IgnoreWord({id: 1}),
    
    initialize:function () {
        this.words = [];
        this.ignore_words = [];
        this.key_words = [];

        this.keyWord.bind("change:value", this.update_keyword, this);
        this.ignoreWord.bind("change:value", this.update_ignoreword, this);
    },

    update_keyword: function(result){
        this.$('.key_words').val(this.keyWord.get('value'));
    },

    update_ignoreword: function(result){
        this.$('.ignore_words').val(this.ignoreWord.get('value'))
    },

    events:{
        "blur .key_words": "save_keyword",
        "blur .ignore_words": "save_ignoreword",
        "submit #form": "analise_text"
    },

    save_keyword: function(){
        this.keyWord.save({value: $('.key_words').val()});
    },

    save_ignoreword: function(){
        this.ignoreWord.save({value: $('.ignore_words').val()});
    },

    separate_words: function(text, index){
        text = this.reserve_key_words(text);
        text = text.replace(/[\-\(\)\,\'\"\/\:\;\?\!\{\}\[\]\#\$]/gi, ' ');
        var words = text.split(" ");
        for (var i=0; i < words.length ; i++){
            var word = words[i].trim();
            word = word.replace(/\.([\.]*)$/, '');
            this.populate_words(word, index);
        }
    },

    populate_words: function(word, index){
        if (this.is_valid(word)){
            if(!this.is_ignore_words(word)){
                var has_word = false;
                for(var i=0; i < this.words.length ; i++){
                    var obj_word = this.words[i];
                    if (obj_word.word === word){
                        has_word = true;
                        if (obj_word.index !== index){
                            obj_word.duplicate = obj_word.duplicate + 1;
                            obj_word.index = index;
                        }
                        obj_word.repeat = obj_word.repeat + 1;
                        break;
                    }
                }

                if (!has_word){
                    var obj = {word: word, repeat: 1, duplicate: 1, index: index};
                    this.words.push(obj);
                }
            }
        }
    },

    is_valid: function(word){
        if (word.length <= 1) return false;

        return true;
    },

    reserve_key_words: function(text){
        for(var i=0; i < this.key_words.length ; i++){
            var key_word = this.key_words[i].trim().toLowerCase();
            if (text.indexOf(key_word) !== -1){
                text = text.replace(key_word,key_word.replace(/[\-\(\)\,\'\"\/\:\;\?\!\{\}\[\]\#\$\s]/gi,''));
            }
        }
        return text;
    },

    is_ignore_words: function(word){
        for(var i=0; i < this.ignore_words.length ; i++){
            if (this.ignore_words[i].trim() == word){
                return true;
            }
        }
        return false;
    },

    analise_text: function(){
        $('#words').empty();
        this.words = [];
        this.ignore_words = $('.ignore_words').val().split(',');
        this.key_words = $('.key_words').val().split(',');

        var text = $('#text_search').val();
        var text_in_array = text.split('\n');

        for (var i=0; i < text_in_array.length ; i++){
            this.separate_words(text_in_array[i].toLowerCase(), i);
        }

        this.populate_bubble_chart();
        return false;

    },

    populate_bubble_chart:function () {
        $('#container').empty();

        this.words.sort(function(a,b){
            if(a.duplicate>b.duplicate) return -1;
            if(a.duplicate<b.duplicate) return 1;
            return 0;
        });        

        var datas = [];
        for (var j=0; j < this.words.length ; j++){
            if (this.words[j].duplicate > 1){
                datas.push({name:this.words[j].word + '('+this.words[j].duplicate+')', data:[[this.words[j].word.length,this.words[j].duplicate, this.words[j].repeat]]})
            }
        }

        var height = 400;
        if ((datas.length * 2) > height){
            height = (datas.length * 2)
        }

        $('#container').highcharts({

            chart: {
                type: 'bubble',
                zoomType: 'xy',
                height: height
            },
            labels: {
                items: [{
                    html: "<label> * Duplicate = repeats a word in different paragraphs.</label>",
                    style: {
                        top: '-40px',
                        left: '-5px',
                        height: '30px'
                    }
                }, {
                    html: "<label> * Repeated = repeats a word in all text.</label>",
                    style: {
                        top: '-25px',
                        left: '-5px',
                        height: '30px'
                    }
                }]
            },
            legend: {
                borderWidth: 2
            },
            title: {
                text: 'Duplication of Words'
            },
            yAxis: {
                title: {
                    enabled: true,
                    text: 'Duplicate words'
                },
                min: 0,
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            plotOptions: {
                bubble: {
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: 'Duplicate: {point.y}, Repeats: {point.z}'
                    }
                }
            },
            series: datas
        
        });
    },

    render:function (eventName) {
        $(this.el).html(this.template({words: this.words}));

        this.keyWord.fetch();
        this.ignoreWord.fetch();

        return this;
    }

});

// Router
var AppRouter = Backbone.Router.extend({
    
    routes:{
        "":"index"
    },

    index:function () {
        this.indexView = new IndexView();
        $('#content').html(this.indexView.render().el);
    },

});

var app = new AppRouter();
Backbone.history.start();