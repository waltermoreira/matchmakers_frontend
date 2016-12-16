(function($){
    $(function(){

        var options = {
            include: ["score"],
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            keys: [
                "Name"
            ]
        };

        var fuse = new Fuse([], options);

        $.get("http://159.203.75.92/mm", function(data) {
            fuse = new Fuse(data, options);
        });
        
        $('#info').hide();

        $('#search').keydown(function() {
            var result = fuse.search(this.value);
            if (!result[0]) {
                $('#info').hide();
                return;
            };
            display_info(result[0]["item"]);
        });
        
        $('#search_form').submit(
            function(event) {
                event.preventDefault();
            }
        );

        var recognition = new webkitSpeechRecognition();
        recognition.interimResults = true;

        $("#mic").bind("touchstart click", function() {
            final_transcript = '';
            recognition.start();
        });

        // $("#mic").click(function() {
        //    // event.preventDefault();
        //     $("#foo").text("click!");
        //     final_transcript = '';
        //     recognition.start();
        // });

        recognition.onstart = function() {
            console.log("Starting");
        };
        recognition.onresult = function(event) {
            console.log("onresult");
            var interim_transcript = '';

            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            $('#search').focus();
            $('#search').val(final_transcript);
            $('#search').trigger(jQuery.Event('keydown', { which: 13 }));
            console.log(final_transcript);
        };

        recognition.onerror = function(event) {
            console.log(event);
            console.log("onerror");
        };
        recognition.onend = function() {
            console.log("onend");
        };
        
    }); // end of document ready
})(jQuery); // end of jQuery name space


function display_info(dog) {
    $('#info').show();
    $('#dog_name').text(dog["Name"]);
    $('#dog_score').text(dog["Scores"]["Dog"] || "--");
    $('#child_score').text(dog["Scores"]["Child"] || "--");
    $('#cat_score').text(dog["Scores"]["Cat"] || "--");
    $('#home_score').text(dog["Scores"]["Home"] || "--");
    $('#notes').text(dog["Notes"]);
    $('#updated').text(dog["Updated"]);
    if (dog["Shelterluv data"]) {
        $('#sl').text('✓');
    } else {
        $('#sl').text('');
    }
};
