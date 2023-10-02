import { Button, InputLabel, Input } from "@mui/material";

interface SubmissionUploaderProps {
    onFileChosen: (file: File) => void,
}

export default function SubmissionUploader({
    onFileChosen,
}: SubmissionUploaderProps) {

    function handleFileInputChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        const file = target.files?.[0];
        if (!(file instanceof File))
            return;
        onFileChosen(file);
    }

    return (<>
        <Button component={InputLabel} variant="contained">
            העלאת קובץ
            <Input type="file" name="file" className="visually-hidden" onChange={handleFileInputChange} />
        </Button>
    </>)
}