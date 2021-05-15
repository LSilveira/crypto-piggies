
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 67,
    "earNoseColor" : 13,
    "shirtColor" : 64,
    "trousersColor" : 28,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 1,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
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
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnaearnose').html()
    dna += $('#dnashirt').html()
    dna += $('#dnatrousers').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)
    earNoseColor(colors[dna.earNoseColor],dna.earNoseColor)
    $('#innerearnosecolor').val(dna.earNoseColor)
    shirtColor(colors[dna.shirtColor],dna.shirtColor)
    $('#dnashirt').val(dna.shirtColor)
    trousersColor(colors[dna.trousersColor],dna.trousersColor)
    $('#dnatrousers').val(dna.trousersColor)

    eyeVariation(dna.eyesShape)
    $('#dnashape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    $('#dnadecoration').val(dna.decorationPattern)
    mouthdecorationVariation(dna.decorationMidcolor)
    $('#dnadecorationMid').val(dna.decorationMidcolor)
    animationVariation(dna.animation)
    $('#dnaanimation').val(dna.animation);
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})

$('#innerearnosecolor').change(()=>{
  var colorVal = $('#innerearnosecolor').val()
  earNoseColor(colors[colorVal],colorVal)
})

$('#shirtcolor').change(()=>{
  var colorVal = $('#shirtcolor').val()
  shirtColor(colors[colorVal],colorVal)
})

$('#trouserscolor').change(()=>{
  var colorVal = $('#trouserscolor').val()
  trousersColor(colors[colorVal],colorVal)
})

$('#eyeshape').change(()=>{
  var shape = parseInt($('#eyeshape').val()) // between 1 an 7
  eyeVariation(shape)
})

$('#decorationshape').change(()=>{
  var decoration = parseInt($('#decorationshape').val()) // between 1 an 7
  decorationVariation(decoration)
})

$('#mouthDecorationshape').change(()=>{
  var decoration = parseInt($('#mouthDecorationshape').val()) // between 1 an 9
  mouthdecorationVariation(decoration)
})

$('#animations').change(()=>{
  var animationVal = parseInt($('#animations').val()) // between 1 an 6
  animationVariation(animationVal)
})