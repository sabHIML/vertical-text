(function($) {
    $( document ).ready(function() {
        var value_textarea = new Object();
        $( "#output_0" ).draggable({ containment: "#parent_id" });

        /*change selection of box and retrive text in textarea*/
        $(document).on('click', ".output",function(){
            if($(this).hasClass('currentOutput'))
                return;
            value_textarea[$(".currentOutput").attr('id')]=$('textarea').val();
            $(".output").removeClass('currentOutput');
            $('textarea').val(value_textarea[$(this).attr('id')]);
            $(this).addClass('currentOutput');

            $('#textarea').focus();

        });

        /*make vertical text in current box from textarea on keyup and mouseup */
        $(document).on('keyup mouseup', "#textarea",function () {
            
            var lineNumber;
            var totalLines = $(this).val().split("\n");
            var cursorLines = $(this).val().substr(0, $(this)[0].selectionStart).split("\n");
            lineNumber =parseInt(cursorLines.length);
            $('#lineNo').text(cursorLines.length);
            $('#colNo').text(cursorLines[lineNumber - 1].substr(0, $(this)[0].selectionStart).length);
            $('.currentOutput').empty();
            for(var i =0,tl = totalLines.length;i < totalLines.length;i++,tl--)
            {
                if(totalLines[i] == "")
                    totalLines[i] = '&nbsp;';
                $('.currentOutput').append('<div class="lines line_'+i+'">'+totalLines[i].replace(/ /g,'&nbsp;')+'</div>');
            }                
            
        });

        /*Create box button action */
        $(document).on('click', "#create",function() {
            lastDiv = $('#parent_id div.output:last').attr('id');
            lastDivIndex = parseInt(lastDiv.replace("output_",""));
            $('#parent_id').append('<div class="output ui-draggable" id="output_'+(lastDivIndex + 1)+'"></div>');
            $( "#output_"+ (lastDivIndex + 1) ).draggable({ containment: "#parent_id" });
            
            
            value_textarea[$(".currentOutput").attr('id')]=$('textarea').val();
            $(".output").removeClass('currentOutput');
            $('textarea').val("");
            $( "#output_"+ (lastDivIndex + 1) ).addClass('currentOutput');
            $('#textarea').focus();
            
        });
            

        /*set the text to box if any in textarea after refresh page. */
        if($.trim($('.currentOutput').html()) == "" && $.trim($('#textarea').val()) != "") {
            $('#textarea').trigger("mouseup");            
        }

        /*make demo text*/
        $('#textarea').val("Demo:\nwrite text here!\n\nPlay with dragging the boxes.\nTry yourself by creating some new box.").trigger("mouseup");
    });
    
})(jQuery)
