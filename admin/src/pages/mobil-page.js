import React from 'react'
import NavbarPart from '../components/common/navbar'
import FooterPart from '../components/common/footer'
import MobilPart from '../components/mobil-page'

const Mobil = () => {
  return (
    <>
        <header>
            <NavbarPart/>
        </header>
        <main>
            <MobilPart/>
        </main>
        <footer>
            <FooterPart/>
        </footer>
    </>
  )
}

export default Mobil