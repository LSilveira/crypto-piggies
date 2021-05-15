function colors_tab() {
    $("#catColors").removeClass("hidden")
    $(".pig_attributes").addClass("hidden")
    $(".pig_color_tab").addClass("active")
    $(".pig_attr_tab").removeClass("active")
}

function attributes_tab() {
    $(".pig_attributes").removeClass("hidden")
    $("#catColors").addClass("hidden")
    $(".pig_attr_tab").addClass("active")
    $(".pig_color_tab").removeClass("active")
}

function randomPig() {

    var randomDNA = {
        "headcolor" : Math.floor(Math.random() * 89) + 10,
        "earNoseColor" : Math.floor(Math.random() * 89) + 10,
        "shirtColor" : Math.floor(Math.random() * 89) + 10,
        "trousersColor" : Math.floor(Math.random() * 89) + 10,
        //Cattributes
        "eyesShape" : Math.floor(Math.random() * 7) + 1,
        "decorationPattern" : Math.floor(Math.random() * 7) + 1,
        "decorationMidcolor" : Math.floor(Math.random() * 9) + 1,
        "decorationSidescolor" : Math.floor(Math.random() * 7) + 1,
        "animation" :  Math.floor(Math.random() * 7) + 1,
        "lastNum" :  Math.floor(Math.random() * 7) + 1
        }

    $('#dnabody').html(randomDNA.headColor);
    $('#dnaearnose').html(randomDNA.earNoseColor);
    $('#dnashirt').html(randomDNA.shirtColor);
    $('#dnatrousers').html(randomDNA.trousersColor);

    $('#dnashape').html(randomDNA.eyesShape)
    $('#dnadecoration').html(randomDNA.decorationPattern)
    $('#dnadecorationMid').html(randomDNA.decorationMidcolor)
    $('#dnadecorationSides').html(randomDNA.decorationSidescolor)
    $('#dnaanimation').html(randomDNA.animation)
    $('#dnaspecial').html(randomDNA.lastNum)

    renderCat(randomDNA)
}

function defaultPig() {
    $('#dnabody').html(defaultDNA.headColor);
    $('#dnaearnose').html(defaultDNA.earNoseColor);
    $('#dnashirt').html(defaultDNA.shirtColor);
    $('#dnatrousers').html(defaultDNA.trousersColor);
    
    $('#dnashape').html(defaultDNA.eyesShape)
    $('#dnadecoration').html(defaultDNA.decorationPattern)
    $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
    $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
    $('#dnaanimation').html(defaultDNA.animation)
    $('#dnaspecial').html(defaultDNA.lastNum)

    renderCat(defaultDNA)
}