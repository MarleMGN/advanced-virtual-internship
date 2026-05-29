import React from 'react'
import './authentication.css'

const authentication = () => {
  return (
    <>
        <div className="auth__wrapper">
            <div className="auth">
                <div className="auth__content">
                    <div className="auth__title">Log in to Summarist</div>
                    <button className="btn guest__btn--wrapper">
                        <figure className="google__icon--mask guest__icon--mask">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                        </figure>
                        <div>Login as a guest</div>
                    </button>
                    <div className="auth__separator">
                        <span className="auth__seperator--text">or</span>
                    </div>
                    <button className="btn google__btn--wrapper">
                        <figure className="google__icon--mask">
                            <img src="/google.png" alt="google" />
                        </figure>
                        <div>Login with Google</div>
                    </button>
                    <div className="auth__separator">
                        <span className="auth__seperator--text">or</span>
                    </div>
                    <form action="" className="auth__main--form">
                        <input type="text" className="auth__main--input" placeholder="Email Address" />
                        <input type="password" className="auth__main--input" placeholder="Password" />
                        <button className="btn">
                            <span>Login</span>
                        </button>
                    </form>
                </div>
                <div className="auth__forgot--password">Forgot your password?</div>
                <button className="auth__switch--btn">Don't have an account?</button>
                <div className="auth__close--btn">
                    <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor"></path></svg>
                </div>
            </div>
        </div>
    </>
  )
}

export default authentication