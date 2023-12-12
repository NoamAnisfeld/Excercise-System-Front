import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from '@mui/material/TextField'
import Button from "@mui/material/Button"

export interface EditableTextProps {
    currentText: string,
    placeholderText?: string,
    onSave: (newText: string) => void | Promise<void>,
}

export default function EditableText({
    currentText,
    placeholderText = '',
    onSave,
}: EditableTextProps) {

    const [editMode, setEditMode] = useState(false);
    const [disabledEditMode, setDisabledEditMode] = useState(false);
    const [tempText, setTempText] = useState<string | null>(null);

    async function saveEdit() {

        setDisabledEditMode(true);
        if (tempText !== null) {
            await onSave(tempText);
        }

        setEditMode(false);
        setDisabledEditMode(false);
        setTempText(null);
    }

    function cancelEdit() {
        setEditMode(false);
        setDisabledEditMode(false);
        setTempText(null);
    }

    function handleSpecialKeys(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    }

    return (
        <Box display="flex" justifyContent="space-between">
            {editMode ?
                <TextField
                    fullWidth={true}
                    autoFocus={true}
                    sx={{
                        '.MuiInputBase-input': {
                            py: 0,
                        }
                    }}
                    disabled={disabledEditMode}
                    value={tempText ?? currentText}
                    onChange={e => setTempText(e.target.value)}
                    onBlur={cancelEdit}
                    onKeyUp={handleSpecialKeys}
                />
                :
                <>
                    <Typography>
                        {currentText || placeholderText}
                    </Typography>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            py: 0,
                            px: 1,
                            minWidth: 0,
                            marginInlineStart: 1,
                        }}
                        onClick={() => setEditMode(true)}
                    >
                        עריכה
                    </Button>
                </>
            }
        </Box>
    )
}