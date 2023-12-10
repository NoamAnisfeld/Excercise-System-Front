import React, { useState } from "react"
import {
    Box,
    FormGroup,
    Button,
    IconButton,
    Input,
    InputLabel,
    NativeSelect,
    TextField,
    Typography,
    Collapse,
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { InputLabelStyledAsButton } from "./util-components"

interface SubmissionUploaderProps {
    onSubmit: (file: File) => void,
}

export default function SubmissionUploader({
    onSubmit,
}: SubmissionUploaderProps) {

    const [selectedFile, setSelectedFile] = useState<File>()
    const [typedText, setTypedText] = useState('');
    const SUGGESTED_TEXT_FILE_EXTENSIONS = [
        'txt', 'py', 'html', 'css', 'js', 'ts', 'jsx', 'tsx', 'json', 'sh', 'c', 'cpp', 'cs', 'java',
    ]
    const [textFileExtension, setTextFileExtension] = useState(SUGGESTED_TEXT_FILE_EXTENSIONS[0]);

    const filePicker = (
        <Box m={1} textAlign="center">
            {!selectedFile ?
                <InputLabelStyledAsButton
                    variant="contained"
                    disabled={Boolean(typedText)}
                >
                    בחרו קובץ להעלאה
                    <Input
                        type="file"
                        name="file"
                        className="visually-hidden"
                        disabled={Boolean(typedText)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSelectedFile(e.target.files?.[0])}
                    />
                </InputLabelStyledAsButton>
                :
                <>
                    <IconButton onClick={() => setSelectedFile(undefined)}>
                        <DeleteIcon />
                    </IconButton>
                    <Typography component="span">
                        {selectedFile.name}
                    </Typography>
                </>
            }
        </Box>
    );

    const textBox = (
        <Box m={1}>
            <TextField
                multiline
                variant="filled"
                rows={10}
                fullWidth
                placeholder="או כתבו את התשובה כאן"
                value={typedText}
                onChange={e => setTypedText(e.target.value)}
            />
            <Box textAlign="end">
                <InputLabel className="inline">סוג הקובץ: </InputLabel>
                <NativeSelect
                    value={textFileExtension}
                    onChange={({ target: { value } }) => setTextFileExtension(value)}
                >
                    {SUGGESTED_TEXT_FILE_EXTENSIONS.map(s =>
                        <option value={s}>{s}</option>
                    )}
                </NativeSelect>
            </Box>
        </Box>
    );

    const submitButton = (
        <Box textAlign="center">
            <Button
                variant="contained"
                onClick={() => onSubmit(
                    selectedFile || new File([typedText], `submission.${textFileExtension}`)
                )}
                disabled={!selectedFile && !typedText}
            >
                שליחה
            </Button>
        </Box>
    );

    return (
        <FormGroup sx={{
            '> .MuiBox-root': {
                margin: 2,
            },

            '.MuiNativeSelect-root select': {
                paddingInlineStart: 1,
            },

            'textarea': {
                fontFamily: 'monospace',
            },

            '.inline': {
                display: 'inline',
            },
        }}>
            <Collapse in={!typedText}>
                {filePicker}
            </Collapse>
            <Collapse in={!selectedFile}>
                {textBox}
            </Collapse>
            {submitButton}
        </FormGroup>
    )
}