import React from 'react'
import MobilCreatePart from '../components/mobil-add'
import NavbarPart from '../components/common/navbar'
import FooterPart from '../components/common/footer'

const MobilCreate = () => {
  return (
    <>
        <header>
            <NavbarPart/>
        </header>
        <main>
            <MobilCreatePart/>
        </main>
        <footer>
            <FooterPart/>
        </footer>
    </>
  )
}

export default MobilCreate