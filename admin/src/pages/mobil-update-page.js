import React from 'react'
import NavbarPart from '../components/common/navbar'
import FooterPart from '../components/common/footer'
import MobilUpdatePart from '../components/mobil-update'

const MobilUpdate = () => {
  return (
    <>
    <header>
        <NavbarPart/>
    </header>
    <main>
        <MobilUpdatePart />
    </main>
    <footer>
        <FooterPart/>
    </footer>
    </>
  )
}

export default MobilUpdate