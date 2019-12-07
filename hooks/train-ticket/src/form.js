export default (Comp) => {
    class Cp extends Comp {
        constructor(props) {
            super(props);
            this.state = {
                ...this.state,
                errors: {

                },
            }
            // error queuq
            this.errorQueue = {};
            this.setEmailcode = this.setEmailcode.bind(this);
            this.callError = this.callError.bind(this);
            this.fIn = this.fIn.bind(this);
            this.bOut = this.bOut.bind(this);

        }
        setEmailcode(v) {
            this._clearStateKey('emailcode', v);
            if (v.target.value.length < 7) {
                this._changeHandler('emailcode', v);
            }
        }
        ckemailcode() {
            let rt = true;
            const errors = [];
            const KEY = 'gcode';
            const intl = this.intl

            this._isEmpty(this.state[KEY], errors, intl.formatMessage({ id: "请输入谷歌验证码" }));
            //验证是否符合规则，不符合则扔到errors队列中去
            this._setError(KEY, errors);

            return this._hasError(KEY);
        }
        _isEmpty(v, errors = [], msg = '') {
            !v && errors.push(msg);
            return !v;
        }
        _changeHandler(k, v) {
            const target = v.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            this.setState({
                [k]: value
            });
        }
        // flg is get code 1 is get code
        _setError(k, v, flg = 0) {
            let { errors } = this.state,
                cd = this._isArray(v) && v.length;

            !this.errorQueue[k] && (this.errorQueue[k] = []);

            this.errorQueue[k][flg] = cd ? v : [];
            setTimeout(() => {
                this.setState(prevState => {
                    return {
                        errors: {
                            ...(prevState.errors),
                            [k]: cd ? (
                                errors[k] ? errors[k].unshift(...v) : errors[k] = [...v],
                                [...new Set(errors[k])]
                            ) : [...(this.errorQueue[k].filter(v => {
                                return v.length > 0;
                            })[0] || [])],
                        }
                    }
                });
            }, 0);
        }
        _hasError(k = '') {
            return !this.errorQueue[k].filter(v => v.length > 0).length;
        }
        callError(k, v) {
            this._setError(k, v ? [v] : [], 1);
            // keydown
            const KEY = 'ky' + k;
            if (this.state[KEY]) {
                this.setState({
                    [KEY]: 0
                });
            }
        }

        clearsError(k = [], flg = 0) {
            k.forEach(v => {
                this._setError(v, "", flg);
            });
            return new Promise((r, e) => {
                setTimeout(() => {
                    r(1);
                })
            })
        }

        changeImgCode() {
            let now = +new Date;
            this.props.changeImgCode(URL_IMG_CODE + "?t=" + now);
        }
        bOut(e) {
            const k = this._getTgKey(e);
            if (this.state.focusBlu) {
                this.setState({
                    focusBlu: ''
                })
            }

            this.clearQueueKey(k);
            this.hasError([k]);
            this.Uc(k);
        }
        fIn(e) {
            const key = this._getTgKey(e);
            key === 'password' && this.setState({
                mvInPwd: 1
            })
            this._setError(key, []);
            this._setError(key, [], 1);
        }

        _isEmpty(v, errors = [], msg = '') {
            !v && errors.push(msg);
            return !v;
        }
    }
}