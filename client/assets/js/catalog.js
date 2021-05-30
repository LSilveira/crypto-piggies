var web3 = new Web3(Web3.givenProvider); // url for the network. givenProvider will use the provider metamask sends

var instance;
var user;
var contractAddress = "0xCCad47b27a35B1B757AFb2a5a08584033200EEf7";

$(document).ready(async function() {
    if (window.ethereum) {
        window.ethereum.enable().then(function(accounts) {
            instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
            user = accounts[0];

            console.log(instance);
            loadPiggies();
        })

    }
    else if (windows.web3) {
        web3 = new Web3(window.web3.currentProvider);
        let accounts = await web3.eth.getAccounts();
        user = accounts[0];
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})

        console.log("Old metamask instance");
        console.log(instance);
    }
    else {
        alert("Browser doesn't have metamask installed");
    }

})

function loadPiggies() {
    instance.methods.getPiggies().call()
    .then(function(result) {

        for(let i = 0; i < result.length; i++) {
            console.log(result[i])
            
            console.log("Head: " + result[i].genes.substring(0, 2))
            console.log("Ear: " + result[i].genes.substring(2, 4))
            console.log("Shirt: " + result[i].genes.substring(4, 6))
            console.log("Trousers: " + result[i].genes.substring(6, 8))
            console.log("Eye: " + result[i].genes.substring(8, 9))
            console.log("Decoration: " + result[i].genes.substring(9, 10))
            console.log("Mouth: " + result[i].genes.substring(10, 11))
            console.log("Slides: " + result[i].genes.substring(11, 12))
            console.log("Animation: " + result[i].genes.substring(12, 13))
            console.log("Special: " + result[i].genes.substring(13, 14))

            let gen = parseInt(result[i].generation)
            let headBodyColour = parseInt(result[i].genes.substring(0, 2))
            let earNoseColor = parseInt(result[i].genes.substring(2, 4))
            let shirtColor = parseInt(result[i].genes.substring(4, 6))
            let trousersColor = parseInt(result[i].genes.substring(6, 8))
            let eyeVariation = parseInt(result[i].genes.substring(8, 9))
            let decorationVariation = parseInt(result[i].genes.substring(9, 10))
            let mouthdecorationVariation = parseInt(result[i].genes.substring(10, 11))
            let slides = parseInt(result[i].genes.substring(11, 12))
            let animationVariation = parseInt(result[i].genes.substring(12, 13))
            let special = parseInt(result[i].genes.substring(13, 14))
            
            $("#catalog").append("<div class='row catalogRow'><div class='col-lg-12 catBox m-2 light-b-shadow'> \
                            <div class='cat'> \
                                <div class='ears'> \
                                    <div class='ear left_ear' style='" + updateColour(headBodyColour) + "' > \
                                        <div class='inner_ear inner_ear_left' style='" + updateColour(earNoseColor) + "' ></div> \
                                    </div> \
                                    <div class='ear right_ear' style='" + updateColour(headBodyColour) + "' > \
                                        <div class='inner_ear inner_ear_right' style='" + updateColour(earNoseColor) + "' ></div> \
                                    </div> \
                                </div> \
                                <div id='head' class='" + updateMovingHeadAnimation(animationVariation) + " " + updateHeadMoveSideAnimation(animationVariation) + " " + updateShakeHeadAnimation(animationVariation) + " " + updateSpecialAnimation(animationVariation) + "' style='" + updateColour(headBodyColour) + "' > \
                                    <div class='eyes'> \
                                        <div class='eye'> \
                                            <div class='pupils left_pupil' style='" + updatePupilsCss(eyeVariation) + " " + updateLeftPupils(eyeVariation) + "'> \
                                                <div class='big_pupil_ball left_big_pupil " + updateBigPupilsClass(eyeVariation) + "' style='" + updateBigPupilsCss(eyeVariation) + " " + updateLeftBigPupils(eyeVariation) + "'></div> \
                                                <div class='small_pupil_ball left_small_pupil' style='" + updateSmallPupilsCss(eyeVariation) + " " + updateLeftSmallPupils(eyeVariation) + "'></div> \
                                                <div class='medium_pupil_ball' style='" + updateMediumPupilsCss(eyeVariation) + "'></div> \
                                            </div> \
                                        </div> \
                                        <div class='eye'> \
                                            <div class='pupils right_pupil' style='" + updatePupilsCss(eyeVariation) + " " + updateRightPupils(eyeVariation) + "'> \
                                                <div class='big_pupil_ball right_big_pupil " + updateBigPupilsClass(eyeVariation) + "' style='" + updateBigPupilsCss(eyeVariation) + " " + updateRightBigPupils(eyeVariation) + "'></div> \
                                                <div class='small_pupil_ball right_small_pupil' style='" + updateSmallPupilsCss(eyeVariation) + " " + updateRightSmallPupils(eyeVariation) + "'></div> \
                                                <div class='medium_pupil_ball' style='" + updateMediumPupilsCss(eyeVariation) + "'></div> \
                                            </div> \
                                        </div> \
                                    </div> \
                                    <div class='nose " + updateShakeNoseAnimation(animationVariation) + "'> \
                                        <div class='nose_whole nose_whole_left' style='" + updateColour(earNoseColor) + "' ></div> \
                                        <div class='nose_whole nose_whole_right' style='" + updateColour(earNoseColor) + "' ></div> \
                                    </div> \
                                    <div class='mouth_decoration'> \
                                        " + updateMouthDecoration(mouthdecorationVariation) + "\
                                    </div> \
                                </div> \
                                <div class='head_decoration'> \
                                    " + updateHeadDecoration(decorationVariation) + " \
                                </div> \
                                <div class='body'> \
                                    <div class='left_hand " + updateShakeLeftHandsAnimation(animationVariation) + "' style='" + updateColour(headBodyColour) + "' ></div> \
                                    <div class='right_hand " + updateShakeRightHandsAnimation(animationVariation) + "' style='" + updateColour(headBodyColour) + "' ></div> \
                                    <div class='torso'> \
                                        <div class='shirt' style='" + updateColour(shirtColor) + "'></div> \
                                        <div class='belt'></div> \
                                        <div class='trousers' style='" + updateColour(trousersColor) + "'></div> \
                                    </div> \
                                    <div class='left_leg'></div> \
                                    <div class='right_leg'></div> \
                                </div> \
                            </div> \
                            <br> \
                            <div class='dnaDiv' id='catDNA'> \
                                <b> \
                                    DNA: \
                                    <!-- Colors --> \
                                    <span id='dnabody'>" + headBodyColour + "</span> \
                                    <span id='dnaearnose'>" + earNoseColor + "</span> \
                                    <span id='dnashirt'>" + shirtColor + "</span> \
                                    <span id='dnatrousers'>" + trousersColor + "</span> \
                                    \
                                    <!-- Cattributes --> \
                                    <span id='dnashape'>" + eyeVariation + "</span> \
                                    <span id='dnadecoration'>" + decorationVariation + "</span> \
                                    <span id='dnadecorationMid'>" + mouthdecorationVariation + "</span> \
                                    <span id='dnadecorationSides'>" + slides + "</span> \
                                    <span id='dnaanimation'>" + animationVariation + "</span> \
                                    <span id='dnaspecial'>" + special + "</span> \
                                </b> \
                                <br \> \
                                <b id='gen'>Gen: " + gen + "</b>\
                            </div> \
                        </div></div>");

            if (i != 0 && i % 2 == 0) {
                $("#catalog").append("<br \><br \>")
            }

        }

    });
}

function updateColour(colour) {

    return "background: #" + colors[colour];
}

function updatePupilsCss(num) {

    switch (num) {
        case 1:
            // Basic
            return "border-top: 15px solid; border-color: rgb(253, 155, 186);"
        case 2:
            // Chill
            return "border-top: 15px solid; border-color: rgb(253, 155, 186);"
        case 3:
            // Sad
            return "border-bottom: 15px solid; border-color: rgb(253, 155, 186);"
        case 4:
            // Sleepy
            return "border-top: 15px solid; border-bottom: 15px solid; border-color: rgb(253, 155, 186);"
        case 5:
            // Left eye closed
            return ""
        case 6:
            // Right eye closed
            return ""
        case 7:
            // Confident
            return "border-top: 35px solid; border-bottom: 8px solid; border-color: rgb(253, 155, 186);"
        default:
            console.log("Not available pupils: " + num)
    }
}

function updateMediumPupilsCss(num) {
    switch (num) {
        case 1:
            return ""
        case 2:
            return ""
        case 3:
            // Sad
            return "display: inline;"
        case 4:
            // Sleepy
            return "display: none;"
        case 5:
            // Left eye closed
            return ""
        case 6:
            // Right eye closed
            return ""
        case 7:
            // Confident
            return ""
        default:
            console.log("Not available medium pupil : " + num)
    }
}

function updateBigPupilsClass(num) {
    switch (num) {
        case 1:
            return ""
        case 2:
            return ""
        case 3:
            // Sad
            return ""
        case 4:
            // Sleepy
            return "pupil_ball_closed_eye"
        case 5:
            // Left eye closed
            return ""
        case 6:
            // Right eye closed
            return ""
        case 7:
            // Confident
            return ""
        default:
            console.log("Not available big pupil c: " + num)
    }
}

function updateBigPupilsCss(num) {
    switch (num) {
        case 1:
            return ""
        case 2:
            return ""
        case 3:
            // Sad
            return ""
        case 4:
            // Sleepy
            return ""
        case 5:
            // Left eye closed
            return ""
        case 6:
            // Right eye closed
            return ""
        case 7:
            // Confident
            return "display: none;"
        default:
            console.log("Not available big pupil s: " + num)
    }
}

function updateSmallPupilsCss(num) {
    switch (num) {
        case 1:
            return ""
        case 2:
            return ""
        case 3:
            // Sad
            return ""
        case 4:
            // Sleepy
            return "display: none;"
        case 5:
            // Left eye closed
            return ""
        case 6:
            // Right eye closed
            return ""
        case 7:
            // Confident
            return "display: none;"
        default:
            console.log("Not available small pupil: " + num)
    }
}

function updateLeftPupils(num) {
    switch (num) {
        case 1:
            return ""
        case 2:
            return ""
        case 3:
            // Sad
            return ""
        case 4:
            // Sleepy
            return ""
        case 5:
            // Left eye closed
            return "border-top: 20px solid; border-bottom: 20px solid; border-color: rgb(253, 155, 186);"
        case 6:
            // Right eye closed
            return ""
        case 7:
            // Confident
            return ""
        default:
            console.log("Not available left pupil: " + num)
    }
}

function updateRightPupils(num) {
    switch (num) {
        case 1:
            return ""
        case 2:
            return ""
        case 3:
            // Sad
            return ""
        case 4:
            // Sleepy
        case 5:
            // Left eye closed
            return ""
        case 6:
            // Right eye closed
            return "border-top: 20px solid; border-bottom: 20px solid; border-color: rgb(253, 155, 186);"
        case 7:
            // Confident
            return ""
        default:
            console.log("Not available right pupil: " + num)
    }
}

function updateLeftBigPupils(num) {
    switch (num) {
        case 1:
            return ""
        case 2:
            return ""
        case 3:
            // Sad
            return ""
        case 4:
            // Sleepy
            return ""
        case 5:
            // Left eye closed
            return "display: none;"
        case 6:
            // Right eye closed
            return ""
        case 7:
            // Confident
            return ""
        default:
            console.log("Not available left big pupil: " + num)
    }
}

function updateRightBigPupils(num) {
    switch (num) {
        case 1:
            return ""
        case 2:
            return ""
        case 3:
            // Sad
            return ""
        case 4:
            // Sleepy
            return ""
        case 5:
            // Left eye closed
            return ""
        case 6:
            // Right eye closed
            return "display: none;"
        case 7:
            // Confident
            return ""
        default:
            console.log("Not available right big pupil: " + num)
    }
}

function updateLeftSmallPupils(num) {
    switch (num) {
        case 1:
            return ""
        case 2:
            return ""
        case 3:
            // Sad
            return ""
        case 4:
            // Sleepy
            return ""
        case 5:
            // Left eye closed
            return "display: none;"
        case 6:
            // Right eye closed
            return ""
        case 7:
            // Confident
            return ""
        default:
            console.log("Not available left small pupil: " + num)
    }
}

function updateRightSmallPupils(num) {
    switch (num) {
        case 1:
            return ""
        case 2:
            return ""
        case 3:
            // Sad
            return ""
        case 4:
            // Sleepy
            return ""
        case 5:
            // Left eye closed
            return ""
        case 6:
            // Right eye closed
            return "display: none;"
        case 7:
            // Confident
            return ""
        default:
            console.log("Not available right small pupil: " + num)
    }
}

function updateHeadDecoration(num) {

    switch (num) {
        case 1:
            // Basic
            return normalDecoration()
        case 2:
            // Hat
            return hatDecoration()
        case 3:
            // Crown
            return crownDecoration()
        case 4:
            // Simple Hair
            return simpleHairDecoration()
        case 5:
            // Grandpa hair
            return grandpaHairDecoration()
        case 6:
            // Christmas Hat
            return christmasHatDecoration()
        case 7:
            // Afro
            return afroDecoration()
        default:
            console.log("Not available decoration: " + num)
    }
}

function normalDecoration() {
    return ""
}

function hatDecoration() {
    return "<div class='hat_top'></div><div class='hat_decoration'></div><div class='hat_base'></div>"
}

function crownDecoration() {
    return "<div class='crown_spike spike_1'>" +
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
                                "</div>"
}

function simpleHairDecoration() {
    return "<div class='simple_hair'>" +
                                    "<div class='hair1'></div>" +
                                    "<div class='hair2'></div>" +
                                    "<div class='hair3'></div>" +
                                    "<div class='hair4'></div>" +
                                    "<div class='hair5'></div>" +
                                "</div>"
}

function grandpaHairDecoration() {
    return "<div class='left_grandpa_hair'>" +
                                    "<div class='left_grandpa_small_hair'></div>" +
                                    "<div class='left_grandpa_big_hair'></div>" +
                                    "<div class='left_grandpa_medium_hair'></div>" +
                                "</div>" +
                                "<div class='right_grandpa_hair'>" +
                                    "<div class='right_grandpa_medium_hair'></div>" +
                                    "<div class='right_grandpa_big_hair'></div>" +
                                    "<div class='right_grandpa_small_hair'></div>" +
                                "</div>"
}

function christmasHatDecoration() {
    return "<div class='christmas_hat_body'></div>" +
                                "<div class='christmas_hat_ball'></div>" +
                                "<div class='christmas_hat_base'>" +
                                    "<div class='christmas_hat_base_1'></div>" +
                                    "<div class='christmas_hat_base_2'></div>" +
                                    "<div class='christmas_hat_base_3'></div>" +
                                    "<div class='christmas_hat_base_4'></div>" +
                                    "<div class='christmas_hat_base_5'></div>" +
                                    "<div class='christmas_hat_base_6'></div>" +
                                    "<div class='christmas_hat_base_7'></div>" +
                                "</div>"
}

function afroDecoration() {
    return "<div class='afro_left_middle'></div>" +
                                "<div class='afro_right_middle'></div>" +
                                "<div class='afro_main_top'></div>" +
                                "<div class='afro_left_top'></div>" +
                                "<div class='afro_main_top'></div>" +
                                "<div class='afro_right_top'></div>" +
                                "<div class='afro_left'></div>" +
                                "<div class='afro_main'></div>" +
                                "<div class='afro_right'></div>"
}

function updateMouthDecoration(num) {
    
    switch (num) {
        case 1:
            // Basic
            return normalMouthDecoration()
        case 2:
            // Happy
            return happyMouthDecoration()
        case 3:
            // Smile Side
            return smileSideMouthDecoration()
        case 4:
            // Surprised
            return surprisedMouthDecoration()
        case 5:
            // Teeth Smile
            return teethSmileMouthDecoration()
        case 6:
            // Tongue out
            return tongueOutMouthDecoration()
        case 7:
            // Gum Ball
            return gumBallMouthDecoration()
        case 8:
            // Sad
            return sadMouthDecoration()
        case 9:
            // Jocker
            return jockerMouthDecoration()
        default:
            console.log("Not available mouth decoration: " + num)
    }
}

function normalMouthDecoration() {
    return "<div class='smile_mouth'></div>"
}

function happyMouthDecoration() {
    return "<div class='happy_mouth'></div>"
}

function smileSideMouthDecoration() {
    return "<div class='side_smile_mouth'></div>"
}

function surprisedMouthDecoration() {
    return "<div class='mouth'>" +
                "<div class='teeth teeth_left'></div>" +
                "<div class='teeth teeth_right'></div>" +
                "<div class='lip'>" +
                    "<div class='lip_middle'></div>" +
                "</div>" +
            "</div>"
}

function teethSmileMouthDecoration() {
    return "<div class='teeth_smile'>" +
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
            "</div>"
}

function tongueOutMouthDecoration() {
    return "<div class='tongue_out_mouth'>" +
                "<div class='tongue_out'>" +
                    "<div class='middle_tongue'></div>" +
                "</div>" +
            "</div>"
}

function gumBallMouthDecoration() {
    return "<div class='top_gum_mouth'></div>" +
            "<div class='gum'></div>" +
            "<div class='bottom_gum_mouth'></div>"
}

function sadMouthDecoration() {
    return "<div class='sad_mouth'></div>"
}

function jockerMouthDecoration() {
    return "<div class='mouth_paint'>" +
                "<div class='mouth_paint_smile'></div>" +
            "</div>"
}

// Stand still 1
// no function

// Moving Head 2
function updateMovingHeadAnimation(num) {
    if (num != 2) {
        return ""
    }
    return "movingHead"
}

// Shake Hands 3
function updateShakeLeftHandsAnimation(num) {
    if (num != 3) {
        return ""
    }
    return "movingLeftArm"
}

function updateShakeRightHandsAnimation(num) {
    if (num != 3) {
        return ""
    }
    return "movingRightArm"
}

// Head move side 4
function updateHeadMoveSideAnimation(num) {
    if (num != 4) {
        return ""
    }
    return "movingHeadSide"
}

// Shake nose 5
function updateShakeNoseAnimation(num) {
    if (num != 5) {
        return ""
    }
    return "shakingNose"
}

// Shake head 6
function updateShakeHeadAnimation(num) {
    if (num != 6) {
        return ""
    }
    return "shakingHead"
}

// Special 7
function updateSpecialAnimation(num) {
    if (num != 7) {
        return ""
    }
    return "movingHead"
}