import React, {useEffect, useRef} from "react";
import {Config, Connect, ConnectEvents} from '@vkontakte/superappkit';
import './App.css'

export const App = () => {
    const authRef = useRef(null);
    Config.init({
        appId: 51775005, // идентификатор приложения
    });

    const oneTapButton = Connect.buttonOneTapAuth({
        // Обязательный параметр в который нужно добавить обработчик событий приходящих из SDK
        callback: function(e) {
            const type = e.type;
            if (!type) {
                return false;
            }
            // eslint-disable-next-line default-case
            switch (type) {
                case ConnectEvents.OneTapAuthEventsSDK.LOGIN_SUCCESS: // = 'VKSDKOneTapAuthLoginSuccess'
                    console.log('LOGIN_SUCCESS',e);
                    return false
                // Для этих событий нужно открыть полноценный VK ID чтобы
                // пользователь дорегистрировался или подтвердил телефон
                case ConnectEvents.OneTapAuthEventsSDK.FULL_AUTH_NEEDED: //  = 'VKSDKOneTapAuthFullAuthNeeded'
                    console.log('FULL_AUTH_NEEDED',e);
                    return false
                case ConnectEvents.OneTapAuthEventsSDK.PHONE_VALIDATION_NEEDED: // = 'VKSDKOneTapAuthPhoneValidationNeeded'
                    console.log('PHONE_VALIDATION_NEEDED',e);
                    return false
                case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN: // = 'VKSDKButtonOneTapAuthShowLogin'
                    console.log('SHOW_LOGIN',e);
                    return false
                    //return Connect.redirectAuth({ url: 'http://localhost', state: 'local'}); // url - строка с url, на который будет произведён редирект после авторизации.
                // state - состояние вашего приложение или любая произвольная строка, которая будет добавлена к url после авторизации.
                // Пользователь перешел по кнопке "Войти другим способом"
                case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN_OPTIONS: // = 'VKSDKButtonOneTapAuthShowLoginOptions'
                    // Параметр url: ссылка для перехода после авторизации. Должен иметь https схему. Обязательный параметр.
                    console.log('SHOW_LOGIN_OPTIONS',e);
                    return false
                    //return Connect.redirectAuth({ url: 'http://localhost' });
            }

            return false;
        },
        // Не обязательный параметр с настройками отображения OneTap
        options: {
            showAlternativeLogin: true, // Отображение кнопки "Войти другим способом"
            displayMode: 'name_phone', // Режим отображения кнопки 'default' | 'name_phone' | 'phone_name'
            buttonStyles: {
                borderRadius: 8, // Радиус скругления кнопок
            }
        },
    });

    useEffect(() => {
        // document.body.appendChild(oneTapButton.getFrame());
        if (authRef) {
            authRef.current.appendChild(oneTapButton.getFrame())
        }
    }, [authRef])

// Удалить iframe можно с помощью OneTapButton.destroy();
    return <div>Hello world
    <div className='auth' ref={authRef}>

    </div>
    </div>
};