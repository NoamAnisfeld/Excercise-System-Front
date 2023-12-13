import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Input from '@mui/material/Input'
import Button from "@mui/material/Button"

export interface EditableNumberProps {
    currentValue: number | null,
    placeholderValue?: string | number,
    onSave: (newValue: number) => void | Promise<void>,
    editable?: boolean,
}

export default function EditableNumber({
    currentValue,
    placeholderValue = '',
    onSave,
    editable = true,
}: EditableNumberProps) {

    const [editMode, setEditMode] = useState(false);
    const [disabledEditMode, setDisabledEditMode] = useState(false);
    const [tempValue, setTempValue] = useState<number | null>(null);

    async function saveEdit() {

        setDisabledEditMode(true);
        if (tempValue !== null) {
            await onSave(tempValue);
        }

        setEditMode(false);
        setDisabledEditMode(false);
        setTempValue(null);
    }

    function cancelEdit() {
        setEditMode(false);
        setDisabledEditMode(false);
        setTempValue(null);
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
                <Input
                    type="number"
                    fullWidth={true}
                    autoFocus={true}
                    sx={{
                        '.MuiInputBase-input': {
                            py: 0,
                        }
                    }}
                    disabled={disabledEditMode}
                    value={tempValue ?? currentValue}
                    onChange={e => setTempValue(Number(e.target.value))}
                    onBlur={cancelEdit}
                    onKeyUp={handleSpecialKeys}
                />
                :
                <>
                    <Typography>
                        {currentValue || placeholderValue}
                    </Typography>
                    {editable ?
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
                        :
                        undefined
                    }
                </>
            }
        </Box>
    )
}