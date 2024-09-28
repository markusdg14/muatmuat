import { useEffect, useState } from 'react';
import Base from '../Utils/base';

export default function FormInput({ label, changeInput, value, typeForm, alert, alertMessage }) {
    var base = new Base()

    useEffect(() => {
        init()
    }, [])

    async function init() {
    }

    return (
        <div class="form-group mb-2">
            <label>{label}</label>
            <input type="text" class="form-control" placeholder={label} onChange={(e) => changeInput(e.target.value)} value={value} />
            {
                alert === typeForm &&
                <div class="invalid-feedback d-block m-0">{alertMessage}</div>
            }
        </div>
    )
}