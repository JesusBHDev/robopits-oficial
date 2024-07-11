import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import React from 'react';

const Captcha = ({ onVerificationChange }) => {
    const captcha = useRef(null);
    const onChange = () => {
        
    const captchaValue = captcha.current.getValue();
    onVerificationChange(captchaValue);
    };
    return (
        <div style={{ marginTop:"15px" }}>
            <ReCAPTCHA
                ref={captcha}
                sitekey="6LcK3m0pAAAAAIRzk9q1OgtGLl-LZSZqPaAdJOwC"
                onChange={onChange} />
        </div>
    )
}

export default Captcha
