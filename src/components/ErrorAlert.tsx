import Alert from "@mui/material/Alert"


export interface ErrorAlertProps {
    userMessage: string,
    errorObject?: Error,
}


export default function ErrorAlert({
    userMessage,
    errorObject,
}: ErrorAlertProps) {

    return (
        <Alert severity="error">
            {userMessage}
            {errorObject ?
                <>
                    <p><strong>פרטים נוספים:</strong></p>
                    <pre dir="ltr" style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(
                        {
                            name: errorObject.name,
                            message: errorObject.message,
                        },
                        undefined,
                        4
                    )}</pre>
                </>
                :
                undefined
            }
        </Alert>
    )
}