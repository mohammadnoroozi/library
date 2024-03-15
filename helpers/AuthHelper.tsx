export function redirectToLogin(response: Response): boolean {
    if (response.status > 400) {
        switch (response.status) {
            case 401:
            case 403:
                window.location.replace(`/user/login?return-url=${window.location.pathname}`);
                return true;
        }
    }
    return false;
}
