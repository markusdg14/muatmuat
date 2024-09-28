import { useEffect, useState } from 'react';
import Base from '../Utils/base';

export default function ProductCard({data, actionBtn}) {
    var base = new Base()

    const [action_btn_arr] = useState([
        { text: 'Edit', typeBtn : 'edit', type: 'warning', icon: 'pencil-fill' },
        { text: 'Delete', typeBtn : 'delete', type: 'danger', icon: 'trash-fill' },
    ])

    useEffect(() => {
        init()
    }, [])

    async function init() {
    }

    return (
        <div className="card mb-3">
            <img className="card-img-top" src={base.img_no_image} />
            <div className="card-body">
                <h5 className="card-title m-0">{data.name}</h5>
                <p className="card-text m-0">Rp. {parseFloat(data.price).toLocaleString('id-ID')}</p>
                <p className="card-text m-0">{data.stock}</p>

                <div className='row mt-3'>
                    {
                        action_btn_arr.map((dataBtn, indexBtn) => (
                            <div className='col-12 col-lg-6 mb-2 mb-lg-0' key={indexBtn}>
                                <button className={'w-100 btn btn-' + dataBtn.type} onClick={()=>actionBtn(dataBtn.typeBtn)}>
                                    <i className={'mr-2 bi bi-' + dataBtn.icon}></i>{dataBtn.text}</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}