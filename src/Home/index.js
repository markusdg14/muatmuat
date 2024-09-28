import { useEffect, useState } from 'react';
import Base from '../Utils/base';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCard from '../Components/productCard';
import FormInput from '../Components/formInput';

export default function HomeIndex() {
    var base = new Base()

    const [product_arr, set_product_arr] = useState([
        { name: 'Product 1', price: '25000', stock: 2 },
        { name: 'Product 2', price: '1000000', stock: 10 },
        { name: 'Product 3', price: '1500000', stock: 15 },
        { name: 'Product 4', price: '2000000', stock: 20 },
        { name: 'Product 5', price: '2500000', stock: 25 },
        { name: 'Product 6', price: '750000', stock: 20 },
        { name: 'Product 7', price: '500000', stock: 5 },
        { name: 'Product 8', price: '1000000', stock: 10 },
        { name: 'Product 9', price: '1500000', stock: 15 },
        { name: 'Product 10', price: '200', stock: 20 },
        { name: 'Product 11', price: '2500000', stock: 25 },
        { name: 'Product 12', price: '750000', stock: 20 },
        { name: 'Product 13', price: '500000', stock: 1 },
        { name: 'Product 14', price: '1000000', stock: 10 },
        { name: 'Product 15', price: '1500000', stock: 15 },
        { name: 'Product 16', price: '2000000', stock: 20 },
        { name: 'Product 17', price: '2500000', stock: 25 },
        { name: 'Product 18', price: '750000', stock: 20 },
    ])
    const [product_arr_temp, set_product_arr_temp] = useState([])

    const [name, set_name] = useState('')
    const [price, set_price] = useState('')
    const [stock, set_stock] = useState('')

    const [alertType, set_alertType] = useState('')
    const [alertMessage, set_alertMessage] = useState('')

    const [modal_alert, set_modal_alert] = useState({ type: '', message: '' })

    const [product_data_index, set_product_data_index] = useState('')

    const [disabled_modal_btn, set_disabled_modal_btn] = useState(false)

    const [sort_arr, set_sort_arr] = useState([
        { name: 'Price Asc', type: 'priceAsc', is_selected: false },
        { name: 'Price Desc', type: 'priceDesc', is_selected: false },
        { name: 'Stock Asc', type: 'stockAsc', is_selected: false },
        { name: 'Stock Desc', type: 'stockDesc', is_selected: false }
    ])

    useEffect(() => {
        init()
    }, [])

    async function init() {
        set_product_arr_temp(product_arr)
        base.$('#modalProductForm').on('hidden.bs.modal', function (e) {
            setAlert()
            set_name('')
            set_price('')
            set_stock('')

            set_modal_alert({ type: '', message: '' })
            set_product_data_index('')
            set_disabled_modal_btn(false)
        })

        var response = await base.axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
    }

    async function actionBtnPress(index, type) {
        set_product_data_index(index)
        if (type === 'edit') {
            set_name(product_arr[index].name)
            set_price(product_arr[index].price)
            set_stock(product_arr[index].stock)

            base.$('#modalProductForm').modal('show')
        }
        else if (type === 'delete') {
            base.$('#modalDeleteConfirm').modal('show')
        }
    }

    async function addProductBtn() {
        base.$('#modalProductForm').modal('show')
    }

    async function changeInput(value, type) {
        setAlert()
        set_disabled_modal_btn(false)

        if (type === 'name') {
            set_name(value)
        }
        else if (type === 'price') {
            var index = value.length - 1
            if (value.charCodeAt(index) >= 48 && value.charCodeAt(index) <= 57) {
                set_price(value)
            }
        }
        else if (type === 'stock') {
            var index = value.length - 1
            if (value.charCodeAt(index) >= 48 && value.charCodeAt(index) <= 57) {
                set_stock(value)
            }
        }
    }

    async function setAlert(alert = '', message = '') {
        set_alertType(alert)
        set_alertMessage(message)
    }

    async function modalBtn(type) {
        if (type === 'save') {
            if (name === '') {
                setAlert('name', 'Name cannot be empty')
            }
            else if (price === '') {
                setAlert('price', 'Price cannot be empty')
            }
            else if (stock === '') {
                setAlert('stock', 'Stock cannot be empty')
            }

            else {
                set_modal_alert({ type: 'warning', message: 'Please Wait...' })
                set_disabled_modal_btn(true)

                if (product_data_index === '') {
                    var dataAdd = { name: name, price: price, stock: stock }
                    base.add_array(product_arr, set_product_arr, dataAdd)
                    base.add_array(product_arr_temp, set_product_arr_temp, dataAdd)
                }
                else {
                    var dataUpdate = { name: name, price: price, stock: stock }
                    base.update_array(product_arr, set_product_arr, dataUpdate, product_data_index)
                    base.update_array(product_arr_temp, set_product_arr_temp, dataUpdate, product_data_index)
                }


                setTimeout(() => {
                    base.$('#modalProductForm').modal('hide')
                }, 1000);
            }
        }
        else {
            base.$('#modalProductForm').modal('hide')
        }
    }

    async function modalDeleteBtn(type) {
        if (type === 'delete') {
            base.remove_array(product_arr, set_product_arr, product_data_index)
            base.remove_array(product_arr_temp, set_product_arr_temp, product_data_index)
        }

        base.$('#modalDeleteConfirm').modal('hide')
    }

    async function sortBtn(type, index) {
        for (var x in sort_arr) {
            sort_arr[x].is_selected = false
        }
        var data_sort = sort_arr[index]
        data_sort.is_selected = true
        base.update_array(sort_arr, set_sort_arr, data_sort, index)

        if(type === 'priceAsc'){
            for (var i = 0; i < product_arr.length; i++) {
                for (var j = 0; j < product_arr.length - i - 1; j++) {
                    if (parseFloat(product_arr[j].price) > parseFloat(product_arr[j + 1].price)) {
                        var temp = product_arr[j];
                        product_arr[j] = product_arr[j + 1];
                        product_arr[j + 1] = temp;
                    }
                }
            }
        }
        else if(type === 'priceDesc'){
            for (var i = 0; i < product_arr.length; i++) {
                for (var j = 0; j < product_arr.length - i - 1; j++) {
                    if (parseFloat(product_arr[j].price) < parseFloat(product_arr[j + 1].price)) {
                        var temp = product_arr[j];
                        product_arr[j] = product_arr[j + 1];
                        product_arr[j + 1] = temp;
                    }
                }
            }
        }
        else if(type === 'stockAsc'){
            for (var i = 0; i < product_arr.length; i++) {
                for (var j = 0; j < product_arr.length - i - 1; j++) {
                    if (parseFloat(product_arr[j].stock) > parseFloat(product_arr[j + 1].stock)) {
                        var temp = product_arr[j];
                        product_arr[j] = product_arr[j + 1];
                        product_arr[j + 1] = temp;
                    }
                }
            }
        }
        else if(type === 'stockDesc'){
            for (var i = 0; i < product_arr.length; i++) {
                for (var j = 0; j < product_arr.length - i - 1; j++) {
                    if (parseFloat(product_arr[j].stock) < parseFloat(product_arr[j + 1].stock)) {
                        var temp = product_arr[j];
                        product_arr[j] = product_arr[j + 1];
                        product_arr[j + 1] = temp;
                    }
                }
            }
        }


    }

    async function changeSearch(value) {

        set_product_arr([])
        var arr_temp = JSON.parse(JSON.stringify(product_arr_temp))
        var data = arr_temp.filter((obj) => {
            return (JSON.stringify(obj).toLowerCase().includes(value.toLowerCase()))
        })

        console.log(data)

        set_product_arr(data)
    }

    return (
        <div className='page_wrap'>
            <div className='row'>

                <div className='col-12'>
                    <h2>MuatMuat</h2>
                </div>

                <div className='col-12 mb-3 text-right'>
                    <button className='btn btn-primary' onClick={() => addProductBtn()}><i className='bi bi-plus mr-3'></i>Add Product</button>
                </div>

                <div className='col-12'>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <i className='input-group-text bi bi-search'></i>
                        </div>
                        <input type="text" className="form-control" placeholder="Search Product..." aria-describedby="basic-addon1" onChange={(e) => changeSearch(e.target.value)} />
                    </div>
                </div>

                <div className='col-12 text-right mb-3'>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {
                                sort_arr.map((data, index) => (
                                    <a class={"dropdown-item " + (data.is_selected ? 'active' : '')} href="#!" onClick={() => sortBtn(data.type, index)} key={index}>{data.name}</a>

                                ))
                            }
                        </div>
                    </div>
                </div>


                <div className='col-12'>

                    <div className='row'>
                        {
                            product_arr.map((data, index) => (
                                <div className='col-4 col-md-3'>
                                    <ProductCard data={data} key={index} actionBtn={(typeBtn) => actionBtnPress(index, typeBtn)} />
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>

            <div className="modal fade" id="modalProductForm" tabindex="-1" role="dialog" aria-labelledby="modalProductFormLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{product_data_index === '' ? 'Add' : 'Edit'} Product</h5>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                {
                                    modal_alert.type !== '' &&
                                    <div className='col-12'>
                                        <div className={"alert alert-" + modal_alert.type} role="alert">
                                            {modal_alert.message}
                                        </div>
                                    </div>
                                }
                                <div className='col-12'>
                                    <FormInput label={'Name'} changeInput={(value) => changeInput(value, 'name')} value={name} typeForm={'name'} alert={alertType} alertMessage={alertMessage} />
                                </div>
                                <div className='col-12'>
                                    <FormInput label={'Price'} changeInput={(value) => changeInput(value, 'price')} value={price} typeForm={'price'} alert={alertType} alertMessage={alertMessage} />
                                </div>
                                <div className='col-12'>
                                    <FormInput label={'Stock'} changeInput={(value) => changeInput(value, 'stock')} value={stock} typeForm={'stock'} alert={alertType} alertMessage={alertMessage} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" disabled={disabled_modal_btn} onClick={() => modalBtn('cancel')}>Cancel</button>
                            <button type="button" className="btn btn-primary" disabled={disabled_modal_btn} onClick={() => modalBtn('save')}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalDeleteConfirm" tabindex="-1" role="dialog" aria-labelledby="modalDeleteConfirmLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className={"alert alert-danger"} role="alert">
                                Are you sure want to remove this data?
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => modalDeleteBtn('cancel')}>No</button>
                            <button type="button" className="btn btn-primary" onClick={() => modalDeleteBtn('delete')}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}