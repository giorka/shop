import React, { useContext, useEffect, useState } from 'react'
import cl from './Login.module.css'
import LoginService from '../../API/LoginService'
import SwitchButtons from '../../componets/UI/SwitchButtons/SwitchButtons'
import { AuthContext } from '../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { useTranslation } from 'react-i18next'

function Login() {
    const { t, i18n } = useTranslation();
    const [buttonsValue, setButtonsValue] = useState("one")
    const [inputRequired, setInputRequired] = useState(false)
    const [loginForm, setLoginForm] = useState({email: "", password: ""})
    const [registrationForm, setRegistrationForm] = useState({email: "", password: "", againPassword: ""})
    const [registerError, setRegisterError] = useState({password: [], email: []})
    const [loginError, setLoginError] = useState({non_field_errors: []})
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const router = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if(isAuth && location.state && location.state.from) {
            router(location.state.from)
        }
        if(isAuth && !location.state) router('/profile')
        if(location.hash.startsWith("#access_token=")){
            google(location.hash.slice(14))
        }
    })

    async function google (google_token) {
        try{
            let response = await LoginService.google(google_token)
            localStorage.setItem("auth", response.data.auth_token)
            setIsAuth(true)
        } catch (e){
            console.log(e.response.data)
        }
    }

    async function registration (e) {
        e.preventDefault();
        setInputRequired(true);
        if (registrationForm.againPassword !== registrationForm.password) return;
        try{
            let response = await LoginService.registration(registrationForm.email, registrationForm.password)
            localStorage.setItem("auth", response.data.auth_token)
            setIsAuth(true)
        } catch (e){
            setRegisterError(e.response.data)
        }
        
        
    }

    async function login (e) {
        e.preventDefault();
        setInputRequired(true);
        try{
            let response = await LoginService.login(loginForm.email, loginForm.password)
            localStorage.setItem("auth", response.data.auth_token)
            setIsAuth(true)
        } catch (e){
            setLoginError(e.response.data)
            console.log(e)
        }
    }

  return (
    <div className={cl.login}>
      <div className={cl.login_content}>
        <SwitchButtons buttonsValue={buttonsValue} setButtonsValue={setButtonsValue} firstButtonText={t("login.login")}  secondButtonText={t("login.register")}/>
        {(buttonsValue === "one") &&
            <form>
                <input  type="email"
                        required={inputRequired}
                        value={loginForm.email}
                        onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                        placeholder='E-mail'/>
                {loginError.non_field_errors  && loginError.non_field_errors.map(e => 
                <h3 className={cl.error} key={e}>{e}</h3>
            )}
                {loginError.email  && loginError.email.map(e => 
                <h3 className={cl.error} key={e}>{e}</h3>
            )}
                <input  type="password" 
                        required={inputRequired}
                        value={loginForm.password}
                        onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                        placeholder={t("login.password")}/>
                {loginError.password  && loginError.password.map(e => 
                <h3 className={cl.error} key={e}>{e}</h3>
            )}
                <button className={cl.button_login} onClick={login}>{t("login.login_button")} </button>
                <button className={cl.google}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_181_460)">
                    <path d="M12.5425 1.18403C8.94558 2.43184 5.84357 4.80024 3.69214 7.94134C1.54071 11.0824 0.453265 14.8307 0.589533 18.6355C0.725802 22.4403 2.0786 26.1011 4.44922 29.0803C6.81985 32.0594 10.0833 34.1999 13.7603 35.1872C16.7414 35.9564 19.8646 35.9901 22.8616 35.2856C25.5766 34.6758 28.0866 33.3713 30.146 31.5C32.2893 29.4928 33.8451 26.9394 34.646 24.1143C35.5165 21.0422 35.6714 17.8113 35.0988 14.67H18.3588V21.614H28.0535C27.8597 22.7216 27.4445 23.7786 26.8327 24.7219C26.2209 25.6653 25.4251 26.4754 24.4929 27.104C23.309 27.8871 21.9745 28.414 20.575 28.6509C19.1714 28.9119 17.7318 28.9119 16.3282 28.6509C14.9056 28.3568 13.5598 27.7696 12.3766 26.9268C10.4758 25.5813 9.0485 23.6698 8.29848 21.465C7.53577 19.2189 7.53577 16.7839 8.29848 14.5378C8.83236 12.9634 9.71494 11.5299 10.8804 10.3443C12.214 8.96269 13.9025 7.97508 15.7605 7.48987C17.6185 7.00465 19.5742 7.04058 21.4132 7.59371C22.8497 8.03469 24.1634 8.80516 25.2494 9.84371C26.3425 8.75621 27.4338 7.6659 28.5232 6.57278C29.0857 5.98496 29.6988 5.42528 30.2528 4.8234C28.5951 3.28068 26.6491 2.08025 24.5266 1.2909C20.6614 -0.112564 16.4322 -0.150281 12.5425 1.18403Z" fill="white"/>
                    <path d="M12.542 1.18405C16.4313 -0.151164 20.6606 -0.11444 24.5261 1.28811C26.649 2.08282 28.594 3.28903 30.2495 4.83749C29.687 5.43936 29.0936 6.00186 28.5198 6.58686C27.4286 7.67624 26.3383 8.76186 25.2489 9.84374C24.1628 8.80519 22.8492 8.03471 21.4127 7.59374C19.5743 7.03867 17.6186 7.00066 15.7601 7.48389C13.9017 7.96712 12.2122 8.95291 10.877 10.3331C9.71163 11.5187 8.82904 12.9522 8.29516 14.5265L2.46484 10.0125C4.55174 5.87407 8.16508 2.70849 12.542 1.18405Z" fill="#E33629"/>
                    <path d="M0.915148 14.4843C1.22852 12.9312 1.74878 11.4272 2.46202 10.0125L8.29234 14.5378C7.52963 16.7838 7.52963 19.2189 8.29234 21.465C6.34984 22.965 4.4064 24.4725 2.46202 25.9875C0.676509 22.4333 0.131959 18.3839 0.915148 14.4843Z" fill="#F8BD00"/>
                    <path d="M18.3567 14.6672H35.0967C35.6693 17.8086 35.5144 21.0394 34.6439 24.1116C33.843 26.9367 32.2873 29.4901 30.1439 31.4972C28.2623 30.0291 26.3723 28.5722 24.4908 27.1041C25.4236 26.4749 26.2198 25.6638 26.8317 24.7195C27.4435 23.7752 27.8584 22.717 28.0514 21.6085H18.3567C18.3539 19.2966 18.3567 16.9819 18.3567 14.6672Z" fill="#587DBD"/>
                    <path d="M2.46094 25.9875C4.40531 24.4875 6.34875 22.98 8.29125 21.465C9.04277 23.6705 10.4721 25.5822 12.375 26.9268C13.5619 27.7657 14.9106 28.3481 16.335 28.6368C17.7386 28.8978 19.1783 28.8978 20.5819 28.6368C21.9814 28.3999 23.3159 27.873 24.4997 27.09C26.3813 28.5581 28.2712 30.015 30.1528 31.4831C28.0938 33.3554 25.5837 34.6609 22.8684 35.2715C19.8715 35.9761 16.7482 35.9423 13.7672 35.1731C11.4095 34.5436 9.20721 33.4338 7.29844 31.9134C5.27811 30.3094 3.628 28.288 2.46094 25.9875Z" fill="#319F43"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_181_460">
                    <rect width="36" height="36" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                    <div>{t("login.google")}</div>
                </button>
            </form>
        }
        {((buttonsValue === "two") &&
        <form>
            <input  required={inputRequired}
                    type="email"
                    placeholder='E-mail' 
                    value={registrationForm.email} 
                    onChange={e => setRegistrationForm({...registrationForm, email: e.target.value})}/>
            {registerError.email && registerError.email.map(e => 
                <h3 className={cl.error} key={e}>{e}</h3>
            )}
            <input  required={inputRequired} 
                    type="password"
                    minLength={8}
                    placeholder={t("login.password")} 
                    value={registrationForm.password} 
                    onChange={e => setRegistrationForm({...registrationForm, password: e.target.value})}/>
            {registerError.password && registerError.password.map(e => 
                <h3 className={cl.error} key={e}>{e}</h3>
            )}
            <input  required={inputRequired} 
                    pattern={registrationForm.password}
                    type="password"
                    placeholder={t("login.again_password")} 
                    value={registrationForm.againNumber} 
                    onChange={e => setRegistrationForm({...registrationForm, againPassword: e.target.value})}/>
            <button className={cl.button_registartion} onClick={registration}>{t("login.register_button")} </button>
            <button className={cl.google}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_181_460)">
                <path d="M12.5425 1.18403C8.94558 2.43184 5.84357 4.80024 3.69214 7.94134C1.54071 11.0824 0.453265 14.8307 0.589533 18.6355C0.725802 22.4403 2.0786 26.1011 4.44922 29.0803C6.81985 32.0594 10.0833 34.1999 13.7603 35.1872C16.7414 35.9564 19.8646 35.9901 22.8616 35.2856C25.5766 34.6758 28.0866 33.3713 30.146 31.5C32.2893 29.4928 33.8451 26.9394 34.646 24.1143C35.5165 21.0422 35.6714 17.8113 35.0988 14.67H18.3588V21.614H28.0535C27.8597 22.7216 27.4445 23.7786 26.8327 24.7219C26.2209 25.6653 25.4251 26.4754 24.4929 27.104C23.309 27.8871 21.9745 28.414 20.575 28.6509C19.1714 28.9119 17.7318 28.9119 16.3282 28.6509C14.9056 28.3568 13.5598 27.7696 12.3766 26.9268C10.4758 25.5813 9.0485 23.6698 8.29848 21.465C7.53577 19.2189 7.53577 16.7839 8.29848 14.5378C8.83236 12.9634 9.71494 11.5299 10.8804 10.3443C12.214 8.96269 13.9025 7.97508 15.7605 7.48987C17.6185 7.00465 19.5742 7.04058 21.4132 7.59371C22.8497 8.03469 24.1634 8.80516 25.2494 9.84371C26.3425 8.75621 27.4338 7.6659 28.5232 6.57278C29.0857 5.98496 29.6988 5.42528 30.2528 4.8234C28.5951 3.28068 26.6491 2.08025 24.5266 1.2909C20.6614 -0.112564 16.4322 -0.150281 12.5425 1.18403Z" fill="white"/>
                <path d="M12.542 1.18405C16.4313 -0.151164 20.6606 -0.11444 24.5261 1.28811C26.649 2.08282 28.594 3.28903 30.2495 4.83749C29.687 5.43936 29.0936 6.00186 28.5198 6.58686C27.4286 7.67624 26.3383 8.76186 25.2489 9.84374C24.1628 8.80519 22.8492 8.03471 21.4127 7.59374C19.5743 7.03867 17.6186 7.00066 15.7601 7.48389C13.9017 7.96712 12.2122 8.95291 10.877 10.3331C9.71163 11.5187 8.82904 12.9522 8.29516 14.5265L2.46484 10.0125C4.55174 5.87407 8.16508 2.70849 12.542 1.18405Z" fill="#E33629"/>
                <path d="M0.915148 14.4843C1.22852 12.9312 1.74878 11.4272 2.46202 10.0125L8.29234 14.5378C7.52963 16.7838 7.52963 19.2189 8.29234 21.465C6.34984 22.965 4.4064 24.4725 2.46202 25.9875C0.676509 22.4333 0.131959 18.3839 0.915148 14.4843Z" fill="#F8BD00"/>
                <path d="M18.3567 14.6672H35.0967C35.6693 17.8086 35.5144 21.0394 34.6439 24.1116C33.843 26.9367 32.2873 29.4901 30.1439 31.4972C28.2623 30.0291 26.3723 28.5722 24.4908 27.1041C25.4236 26.4749 26.2198 25.6638 26.8317 24.7195C27.4435 23.7752 27.8584 22.717 28.0514 21.6085H18.3567C18.3539 19.2966 18.3567 16.9819 18.3567 14.6672Z" fill="#587DBD"/>
                <path d="M2.46094 25.9875C4.40531 24.4875 6.34875 22.98 8.29125 21.465C9.04277 23.6705 10.4721 25.5822 12.375 26.9268C13.5619 27.7657 14.9106 28.3481 16.335 28.6368C17.7386 28.8978 19.1783 28.8978 20.5819 28.6368C21.9814 28.3999 23.3159 27.873 24.4997 27.09C26.3813 28.5581 28.2712 30.015 30.1528 31.4831C28.0938 33.3554 25.5837 34.6609 22.8684 35.2715C19.8715 35.9761 16.7482 35.9423 13.7672 35.1731C11.4095 34.5436 9.20721 33.4338 7.29844 31.9134C5.27811 30.3094 3.628 28.288 2.46094 25.9875Z" fill="#319F43"/>
                </g>
                <defs>
                <clipPath id="clip0_181_460">
                <rect width="36" height="36" fill="white"/>
                </clipPath>
                </defs>
            </svg>
                <div>{t("login.google")}</div>
            </button>
        </form>
    )

        }
      </div>
    </div>
  )
}

export default Login
