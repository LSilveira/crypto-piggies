
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('#head, .left_hand, .right_hand, .ear').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earNoseColor(color,code) {
    $('.nose_whole, .inner_ear').css('background', '#' + color)  //This changes the color of the cat
    $('#innerearnosecode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaearnose').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function shirtColor(color,code) {
    $('.shirt').css('background', '#' + color)  //This changes the color of the cat
    $('#shirtcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnashirt').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function trousersColor(color,code) {
    $('.trousers').css('background', '#' + color)  //This changes the color of the cat
    $('#trouserscode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnatrousers').html(code) //This updates the body color part of the DNA that is displayed below the cat
}


//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
        case 2:
            eyesType1()
            $('#eyeName').html('Chill')
            break
        case 3:
            eyesType2()
            $('#eyeName').html('Sad')
            break
        case 4:
            eyesType3()
            $('#eyeName').html('Sleepy')
            break
        case 5:
            eyesType4()
            $('#eyeName').html('Left eye closed')
            break
        case 6:
            eyesType5()
            $('#eyeName').html('Right eye closed')
            break
        case 7:
            eyesType6()
            $('#eyeName').html('Confident')
            break
        default:
            console.log("Not available eye shape")
    }
}

function decorationVariation(num) {

    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break
        case 2:
            $('#decorationName').html('Hat')
            hatdecoration()
            break
        case 3:
            $('#decorationName').html('Crown')
            crowndecoration()
            break
        case 4:
            $('#decorationName').html('Simple Hair')
            simplehairdecoration()
            break
        case 5:
            $('#decorationName').html('Grandpa hair')
            grandpahairdecoration()
            break
        case 6:
            $('#decorationName').html('Christmas Hat')
            christmashatcoration()
            break
        case 7:
            $('#decorationName').html('Afro')
            afrodecoration()
            break
        default:
            console.log("Not available decoration: " + num)
    }
}

function mouthdecorationVariation(num) {
    
    $('#dnadecorationMid').html(num)
    switch (num) {
        case 1:
            $('#mouthDecorationName').html('Basic')
            normalMouthdecoration()
            break
        case 2:
            $('#mouthDecorationName').html('Happy')
            happyMouthdecoration()
            break
        case 3:
            $('#mouthDecorationName').html('Smile Side')
            smileSideMouthdecoration()
            break
        case 4:
            $('#mouthDecorationName').html('Surprised')
            surprisedMouthdecoration()
            break
        case 5:
            $('#mouthDecorationName').html('Teeth Smile')
            teethSmileMouthdecoration()
            break
        case 6:
            $('#mouthDecorationName').html('Tongue out')
            tongueOutMouthdecoration()
            break
        case 7:
            $('#mouthDecorationName').html('Gum Ball')
            gumBallMouthdecoration()
            break
        case 8:
            $('#mouthDecorationName').html('Sad')
            sadMouthdecoration()
            break
        case 9:
            $('#mouthDecorationName').html('Jocker')
            jockerMouthdecoration()
            break
        default:
            console.log("Not available mouth decoration: " + num)
    }
}

function animationVariation(num) {

    $('#dnaanimation').html(num)
    switch (num) {
        case 1:
            $('#animationName').html('Stand still')
            standStillAnimation()
            break
        case 2:
            $('#animationName').html('Moving Head')
            movingHeadAnimation()
            break
        case 3:
            $('#animationName').html('Shake Hands')
            shakeHandsAnimation()
            break
        case 4:
            $('#animationName').html('Head move side')
            headMoveSideAnimation()
            break
        case 5:
            $('#animationName').html('Shake nose')
            shakeNoseAnimation()
            break
        case 6:
            $('#animationName').html('Shake head')
            shakeHeadAnimation()
            break
        case 7:
            $('#animationName').html('Special')
            specialAnimation()
            break
        default:
            console.log("Not available animation: " + num)
    }
}

async function clearEyesCss() {
    await $('.big_pupil_ball').removeClass('pupil_ball_closed_eye')
    await $('.pupils').css('border', 'none')
    await $('.small_pupil_ball').css('display', '')
    await $('.big_pupil_ball').css('display', '')
    await $('.medium_pupil_ball').css('display', 'none')
    await $('.pupils').css('border-color', 'rgb(0, 0, 0)')
}

// Basic
async function normalEyes() {
    await clearEyesCss()
    await $('.pupils').css('border-color', 'rgb(0, 0, 0)')
}

// Chill
async function eyesType1() {
    await clearEyesCss()
    await $('.pupils').css('border-top', '15px solid')
    await $('.pupils').css('border-color', 'rgb(253, 155, 186)')
}

// Sad
async function eyesType2() {
    await clearEyesCss()
    await $('.pupils').css('border-bottom', '15px solid')
    await $('.pupils').css('border-color', 'rgb(253, 155, 186)')
    await $('.medium_pupil_ball').css('display', 'inline')
}

// Sleepy
async function eyesType3() {
    await clearEyesCss()
    await $('.big_pupil_ball').addClass('pupil_ball_closed_eye')
    await $('.small_pupil_ball').css('display', 'none')
    await $('.pupils').css('border-top', '15px solid')
    await $('.pupils').css('border-bottom', '15px solid')
    await $('.pupils').css('border-color', 'rgb(253, 155, 186)')
}

// Left eye closed
async function eyesType4() {
    await clearEyesCss()
    await $('.left_big_pupil').css('display', 'none')
    await $('.left_small_pupil').css('display', 'none')
    await $('.left_pupil').css('border-top', '20px solid')
    await $('.left_pupil').css('border-bottom', '20px solid')
    await $('.left_pupil').css('border-color', 'rgb(253, 155, 186)')
}

// Right eye closed
async function eyesType5() {
    await clearEyesCss()
    await $('.right_big_pupil').css('display', 'none')
    await $('.right_small_pupil').css('display', 'none')
    await $('.right_pupil').css('border-top', '20px solid')
    await $('.right_pupil').css('border-bottom', '20px solid')
    await $('.right_pupil').css('border-color', 'rgb(253, 155, 186)')
}

// Confident
async function eyesType6() {
    await clearEyesCss()
    await $('.big_pupil_ball').css('display', 'none')
    await $('.small_pupil_ball').css('display', 'none')
    await $('.pupils').css('border-top', '35px solid')
    await $('.pupils').css('border-bottom', '8px solid')
    await $('.pupils').css('border-color', 'rgb(253, 155, 186)')
}

/*
async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
*/

async function normaldecoration() {
    $('.head_decoration').html("");
}

async function hatdecoration() {
    $('.head_decoration').html("<div class='hat_top'></div><div class='hat_decoration'></div><div class='hat_base'></div>");
}

async function crowndecoration() {
    $('.head_decoration').html("<div class='crown_spike spike_1'>" +
                                    "<div class='jewel_1 jewel_spike'></div>" +
                                "</div>" +
                                "<div class='crown_spike spike_2'>" +
                                    "<div class='jewel_2 jewel_spike'></div>" +
                                "</div>" +
                                "<div class='crown_spike spike_3'>" +
                                    "<div class='jewel_3 jewel_spike'></div>" +
                                "</div>" +
                                "<div class='crown_spike spike_4'>" +
                                    "<div class='jewel_4 jewel_spike'></div>" +
                                "</div>" +
                                "<div class='crown_base'>" +
                                    "<div class='jewel_base'></div>" +
                                "</div>");
}

async function simplehairdecoration() {
    $('.head_decoration').html("<div class='simple_hair'>" +
                                    "<div class='hair1'></div>" +
                                    "<div class='hair2'></div>" +
                                    "<div class='hair3'></div>" +
                                    "<div class='hair4'></div>" +
                                    "<div class='hair5'></div>" +
                                "</div>");
}

async function grandpahairdecoration() {
    $('.head_decoration').html("<div class='left_grandpa_hair'>" +
                                    "<div class='left_grandpa_small_hair'></div>" +
                                    "<div class='left_grandpa_big_hair'></div>" +
                                    "<div class='left_grandpa_medium_hair'></div>" +
                                "</div>" +
                                "<div class='right_grandpa_hair'>" +
                                    "<div class='right_grandpa_medium_hair'></div>" +
                                    "<div class='right_grandpa_big_hair'></div>" +
                                    "<div class='right_grandpa_small_hair'></div>" +
                                "</div>");
}

async function christmashatcoration() {
    $('.head_decoration').html("<div class='christmas_hat_body'></div>" +
                                "<div class='christmas_hat_ball'></div>" +
                                "<div class='christmas_hat_base'>" +
                                    "<div class='christmas_hat_base_1'></div>" +
                                    "<div class='christmas_hat_base_2'></div>" +
                                    "<div class='christmas_hat_base_3'></div>" +
                                    "<div class='christmas_hat_base_4'></div>" +
                                    "<div class='christmas_hat_base_5'></div>" +
                                    "<div class='christmas_hat_base_6'></div>" +
                                    "<div class='christmas_hat_base_7'></div>" +
                                "</div>");
}

async function afrodecoration() {
    $('.head_decoration').html("<div class='afro_left_middle'></div>" +
                                "<div class='afro_right_middle'></div>" +
                                "<div class='afro_main_top'></div>" +
                                "<div class='afro_left_top'></div>" +
                                "<div class='afro_main_top'></div>" +
                                "<div class='afro_right_top'></div>" +
                                "<div class='afro_left'></div>" +
                                "<div class='afro_main'></div>" +
                                "<div class='afro_right'></div>");
}

async function normalMouthdecoration() {
    $('.mouth_decoration').html("<div class='smile_mouth'></div>");
}

async function happyMouthdecoration() {
    $('.mouth_decoration').html("<div class='happy_mouth'></div>");
}

async function smileSideMouthdecoration() {
    $('.mouth_decoration').html("<div class='side_smile_mouth'></div>");
}

async function surprisedMouthdecoration() {
    $('.mouth_decoration').html("<div class='mouth'>" +
                                    "<div class='teeth teeth_left'></div>" +
                                    "<div class='teeth teeth_right'></div>" +
                                    "<div class='lip'>" +
                                        "<div class='lip_middle'></div>" +
                                        "</div>" +
                                    "</div>");
}

async function teethSmileMouthdecoration() {
    $('.mouth_decoration').html("<div class='teeth_smile'>" +
                                    "<div class='teeth_smile_top_1 teeth_smile_top'></div>" +
                                    "<div class='teeth_smile_top_2 teeth_smile_top'></div>" +
                                    "<div class='teeth_smile_top_3 teeth_smile_top'></div>" +
                                    "<div class='teeth_smile_top_4 teeth_smile_top'></div>" +
                                    "<div class='teeth_smile_top_5 teeth_smile_top'></div>" +
                                    "<div class='teeth_smile_top_6 teeth_smile_top'></div>" +
                                    "<div class='teeth_smile_bottom_1 teeth_smile_bottom'></div>" +
                                    "<div class='teeth_smile_bottom_2 teeth_smile_bottom'></div>" +
                                    "<div class='teeth_smile_bottom_3 teeth_smile_bottom'></div>" +
                                    "<div class='teeth_smile_bottom_4 teeth_smile_bottom'></div>" +
                                    "<div class='teeth_smile_bottom_5 teeth_smile_bottom'></div>" +
                                    "<div class='teeth_smile_bottom_6 teeth_smile_bottom'></div>" +
                                    "<div class='teeth_smile_bottom_7 teeth_smile_bottom'></div>" +
                                    "<div class='teeth_smile_bottom_8 teeth_smile_bottom'></div>" +
                                "</div>");
}

async function tongueOutMouthdecoration() {
    $('.mouth_decoration').html("<div class='tongue_out_mouth'>" +
                                    "<div class='tongue_out'>" +
                                        "<div class='middle_tongue'></div>" +
                                    "</div>" +
                                "</div>");
}

async function gumBallMouthdecoration() {
    $('.mouth_decoration').html("<div class='top_gum_mouth'></div>" +
                                "<div class='gum'></div>" +
                                "<div class='bottom_gum_mouth'></div>");
}

async function sadMouthdecoration() {
    $('.mouth_decoration').html("<div class='sad_mouth'></div>");
}

async function jockerMouthdecoration() {
    $('.mouth_decoration').html("<div class='mouth_paint'>" +
                                    "<div class='mouth_paint_smile'></div>" +
                                "</div>");
}

async function clearAnimations() {
    await $('#head').removeClass('movingHead')
    await $('#head').removeClass('movingHeadSide')
    await $('#head').removeClass('shakingHead')
    await $('.left_hand').removeClass('movingLeftArm')
    await $('.right_hand').removeClass('movingRightArm')
    await $('.nose').removeClass('shakingNose')
}

async function standStillAnimation() {
    await clearAnimations()
}

async function movingHeadAnimation() {
    await clearAnimations()
    $("#head").addClass("movingHead")
}

async function shakeHandsAnimation() {
    await clearAnimations()
    $(".left_hand").addClass("movingLeftArm")
    $(".right_hand").addClass("movingRightArm")
}

async function headMoveSideAnimation() {
    await clearAnimations()
    $("#head").addClass("movingHeadSide")
}

async function shakeNoseAnimation() {
    await clearAnimations()
    $(".nose").addClass("shakingNose")
}

async function shakeHeadAnimation() {
    await clearAnimations()
    $("#head").addClass("shakingHead")
}

async function specialAnimation() {
    await clearAnimations()
    $("#head").addClass("movingHead")
}