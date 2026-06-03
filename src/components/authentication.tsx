"use client";
import React, { useState } from "react";
import "./authentication.css";
import { useModal } from "@/context/ModalContext";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signInAnonymously } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const Authentication = () => {
  const { modalOpen, setModalOpen } = useModal();
  const [isLogin, setIsLogin] = useState(true);
  const [passwordReset, setPasswordReset] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [error, setError] = useState("")

  async function handleGuestLogin() {
    setIsGuestLoading(true);
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await signInAnonymously(auth);
        setModalOpen(false);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message)
        }
    } finally {
        setIsGuestLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setIsGoogleLoading(true);
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await signInWithPopup(auth, googleProvider);
        setModalOpen(false);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message) 
        }
    } finally {
        setIsGoogleLoading(false);
    }
  }

  async function handleSignUp() {
    setIsLoginLoading(true);
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await createUserWithEmailAndPassword(auth, email, password);
        setModalOpen(false);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message)
        }
    } finally {
        setIsLoginLoading(false);
    }
  }

  async function handlePasswordReset() {
    setIsResetLoading(true);
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await sendPasswordResetEmail(auth, email);
        setIsSuccess(true);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message)
        }
    } finally {
        setIsResetLoading(false);
    }
  }

  async function handleLogin() {
    setIsLoginLoading(true);
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await signInWithEmailAndPassword(auth, email, password);
        setModalOpen(false);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message)
        }
    } finally {
        setIsLoginLoading(false);
    }
  }

  return (
    <>
      {passwordReset ? (
        <div
          className={`auth__wrapper ${modalOpen ? "auth__wrapper--open" : ""}`}
        >
          <div className="auth">
            <div className="auth__content">
              <div className="auth__title">Reset your password</div>
              {error && <div className="auth__error">{error}</div>}
              <form className="auth__main--form">
                {isSuccess && (
                  <div className="auth__success">
                    Your reset email has been sent!
                  </div>
                )}
                <input
                  type="email"
                  className="auth__main--input"
                  placeholder="Email Address"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="btn"
                  disabled={isResetLoading}
                >
                  {isResetLoading ? (
                    <div className="spinner" />
                  ) : (
                    <span>Send password reset link</span>
                  )}
                </button>
              </form>
            </div>
            <button
              className="auth__switch--btn"
              onClick={() => {
                setPasswordReset(false);
                setIsSuccess(false);
                setError("")
              }}
            >
              Go to login
            </button>
            <div
              className="auth__close--btn"
              onClick={() => {
                setModalOpen(false);
                setPasswordReset(false);
                setIsSuccess(false);
                setError("")
              }}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`auth__wrapper ${modalOpen ? "auth__wrapper--open" : ""}`}
        >
          <div className="auth">
            <div className="auth__content">
              <div className="auth__title">
                {isLogin ? "Log in to Summarist" : "Sign up with Summarist"}
              </div>
              {error && <div className="auth__error">{error}</div>}
              {isLogin && (
                <button
                  type="button"
                  className="btn guest__btn--wrapper"
                  onClick={handleGuestLogin}
                  disabled={isGuestLoading}
                >
                  <figure className="google__icon--mask guest__icon--mask">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                    </svg>
                  </figure>
                  {isGuestLoading ? (
                    <div className="spinner" />
                  ) : (
                    <div>Login as a Guest</div>
                  )}
                </button>
              )}
              {isLogin && (
                <div className="auth__separator">
                  <span className="auth__separator--text">or</span>
                </div>
              )}
              <button
                className="btn google__btn--wrapper"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                <figure className="google__icon--mask">
                  <img src="/google.png" alt="google" />
                </figure>
                <div>
                  {isGoogleLoading ? (
                    <div className="spinner" />
                  ) : isLogin ? (
                    "Login with Google"
                  ) : (
                    "Sign up with Google"
                  )}
                </div>
              </button>
              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>
              <form action="" className="auth__main--form">
                <input
                  type="text"
                  className="auth__main--input"
                  placeholder="Email Address"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  type="password"
                  className="auth__main--input"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="btn"
                  onClick={isLogin ? handleLogin : handleSignUp}
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? <div className="spinner" /> : isLogin ? "Login" : "Sign up"}
                </button>
              </form>
            </div>
            {isLogin && (
              <button
                className="auth__forgot--password"
                onClick={() => setPasswordReset(true)}
              >
                Forgot your password?
              </button>
            )}
            <button
              className="auth__switch--btn"
              onClick={() => { setIsLogin(!isLogin); setError("") }}
            >
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </button>
            <div
              className="auth__close--btn"
              onClick={() => { setModalOpen(false); setError("") }}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Authentication;
