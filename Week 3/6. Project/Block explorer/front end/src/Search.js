import { Outlet, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import './App.css';

function Search() {
      const {register, handleSubmit} = useForm()
      const navigate = useNavigate()
      const submitInfo = (data) => {
          if(data.formData.length === 66) // Si la longitud es 66 navegamos a tx
              navigate(`tx/${data.formData}`)
          if(data.formData.length === 42) // Si la longitud es 42 navegamos a saldo
              navigate(`balance/${data.formData}`)
          if(/^\d+\.?\d*$/.test(data.formData)) //Si el dato es un número navegamos a bloque
              navigate(`block/${data.formData}`)
      }

      return <div className="container">
            <h3 className="text-center my-3">Ethereum blockchain explorer</h3>
            <form className='d-flex justify-content-center gap-1' onSubmit={handleSubmit(submitInfo)}>
                <input placeholder="Search by address / tx hash / block number" {...register('formData')} size={70}></input>
                <button className="mx-3 btn btn-primary">Search</button>
            </form>
            <div className="border my-3 p-2">
                <Outlet></Outlet>
            </div>
        </div>
}

export default Search;