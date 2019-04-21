import C from '../constants';


export const saveAnnotations = (annotations, image_id) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({annotations, image_id});

        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.SAVE_ANNOTATIONS_REQUEST});

        return fetch("/api/annotations/save/", {headers, body, method: "POST"})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: C.SAVE_ANNOTATIONS_SUCCESSFUL, data: res.data.image });
                    return res.data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: C.SAVE_ANNOTATIONS_FAILED, data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: C.SAVE_ANNOTATIONS_FAILED, data: res.data});
                    throw res.data;
                }
            })
    }
}

export const saveImageData = (image_for_update_id, style, classes) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({image_for_update_id, style, classes});

        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.SAVE_IMAGE_DATA_REQUEST});

        return fetch("/api/annotations/image/save/", {headers, body, method: "POST"})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    let data = {
                        image_for_update_url: res.data.image.image_url,
                        image_for_update_id: res.data.image.image_id,
                    }
                    console.log('data:', res.data)
                    dispatch({type: C.SAVE_IMAGE_DATA_SUCCESSFUL, data: data });
                    return data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: C.SAVE_IMAGE_DATA_FAILED, data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: C.SAVE_IMAGE_DATA_FAILED, data: res.data});
                    throw res.data;
                }
            })
    }
}

export const deleteImage = (image_id, is_updater=false) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({image_id, is_updater});

        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.DELETE_IMAGE_REQUEST});

        return fetch("/api/annotations/delete_image/", {headers, body, method: "POST"})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    let data = {};
                    if (is_updater) {
                        data = {
                            image_for_update_url: res.data.image.image_url,
                            image_for_update_id: res.data.image.image_id,
                        }
                    } else {
                        data = res.data.image;
                    }
                    dispatch({type: C.DELETE_IMAGE_SUCCESSFUL, data: data });
                    return res.data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: C.DELETE_IMAGE_FAILED, data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: C.DELETE_IMAGE_FAILED, data: res.data});
                    throw res.data;
                }
            })
    }
}

export const loadImage = (is_updater=false) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.LOAD_IMAGE_REQUEST});

        return fetch(`/api/annotations/load_image/?is_updater=${is_updater}`, {headers, })
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    let data = {};
                    if (is_updater) {
                        data = {
                            image_for_update_url: res.data.image.image_url,
                            image_for_update_id: res.data.image.image_id,
                        }
                    } else {
                        data = res.data.image;
                    }
                    dispatch({type: C.LOAD_IMAGE_SUCCESSFUL, data: data });
                    return res.data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: C.LOAD_IMAGE_FAILED, data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: C.LOAD_IMAGE_FAILED, data: res.data});
                    throw res.data;
                }
            })
    }
}

export const getStatistics = () => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        dispatch({type: C.GET_STATISTICS_REQUEST});

        return fetch('/api/get_statistics/', {headers, })
            .then(res => {

                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                let data = res.data;
                if (res.status === 200) {
                    console.log('DATA:', data)
                    dispatch({type: C.GET_STATISTICS_SUCCESSFUL, data: data });
                    return data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: C.GET_STATISTICS_FAILED, data: data});
                    throw data;
                } else {
                    dispatch({type: C.GET_STATISTICS_FAILED, data: data});
                    throw data;
                }
            })
    }
}
