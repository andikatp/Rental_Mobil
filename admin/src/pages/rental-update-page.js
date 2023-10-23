import React from 'react'
import NavbarPart from '../components/common/navbar'
import FooterPart from '../components/common/footer'
import RentalUpdatePart from '../components/rental/rental-update-page'

const RentalUpdate = () => {
  return (
    <>
    <header>
        <NavbarPart/>
    </header>
    <main>
        <RentalUpdatePart />
    </main>
    <footer>
        <FooterPart/>
    </footer>
    </>
  )
}

export default RentalUpdate