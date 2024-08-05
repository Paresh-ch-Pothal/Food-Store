import React from 'react'

export default function Productquantity() {
    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Enter the Quantity</label>
                    <input type="Number" className="form-control" id="number" aria-describedby="emailHelp" name='number' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
