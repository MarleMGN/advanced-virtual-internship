"use client"
import { createContext, useContext, useState } from "react"

const ModalContext = createContext<{
  modalOpen: boolean
  setModalOpen: (value: boolean) => void
}>({ modalOpen: false, setModalOpen: () => {} })

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}