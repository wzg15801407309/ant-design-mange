const intFB = () => {
  if (window.FB) {
    window.FB.init({
      appId: process.env.VUE_APP_FACEBOOK_APPID,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.3'
    })
  }
}
const intGapi = handlePlantFormLogin => {
  if (window.gapi) {
    window.gapi.load('auth2', () => {
      window._GOOGLE_Auth2 = window.gapi.auth2.init({
        client_id: process.env.VUE_APP_GOOGLE_APPID, //客户端ID
        cookiepolicy: 'single_host_origin'
      })
      
      // 
      window._GOOGLE_Auth2.attachClickHandler(
        document.getElementById('GOOGLE_BTN'),
        {},
        googleUser => {
          var profile = window._GOOGLE_Auth2.currentUser.get().getBasicProfile()
          handlePlantFormLogin('google', {
            id: profile.getId(),
            name: profile.getName(),
            head: profile.getImageUrl(),
            email: profile.getEmail()
          })
        },
        error => {
          console.log(JSON.stringify(error, undefined, 2))
        }
      )
    })
  }
}

const intNaver = handlePlantFormLogin => {
  if (window.naver) {
    window.naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'bEnqtdv1aljZjdkXAYGg',
      callbackUrl: process.env.VUE_APP_NAVER_CALLBACK,
      callbackHandle: true,
      isPopup: false,
      loginButton: { color: 'green', type: 2, height: 55,width:100 }
      /* callback 페이지가 분리되었을 경우에 callback 페이지에서는 callback처리를 해줄수 있도록 설정합니다. */
    })
    window.naverLogin.init() 
    window.addEventListener('load', loginFromNaver(handlePlantFormLogin)) 
  }
}

const loginFromNaver = handlePlantFormLogin => {
  if (window.location.hash == '' || window.location.hash.length < 10) {
    return
  } 
  window.naverLogin.getLoginStatus(status => {
    if (status) {
      /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
      var email = window.naverLogin.user.getEmail()
      if (email == undefined || email == null) {
        alert('이메일은 필수정보입니다. 정보제공을 동의해주세요.')
        /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
        window.naverLogin.reprompt()
        return
      }
      handlePlantFormLogin('naver', {
        id: window.naverLogin.user.id,
        name: window.naverLogin.user.nickname,
        head: window.naverLogin.user.profile_image,
        email: window.naverLogin.user.email
      })
    } else {
      console.log('callback 처리에 실패하였습니다.')
    }
  })
}

export const loginFromFacebook = handlePlantFormLogin => {
  window.FB.login(response => {
    if (response.authResponse) {
      window.FB.api('/me', response => {
        handlePlantFormLogin('facebook', {
          id: response.id,
          name: response.name,
          email: response.name
        })
      })
    } else {
      console.log('User cancelled login or did not fully authorize.')
    }
  })
}

export const initOtherLogin = handlePlantFormLogin => {  
  
  intFB()
  intGapi(handlePlantFormLogin)
  intNaver(handlePlantFormLogin)
}
