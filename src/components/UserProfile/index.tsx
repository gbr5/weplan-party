import React from 'react';
import { Container } from './styles';

const WeplanUserProfileWindow: React.FC = () => {
  return (
    <Container />
    //   <WindowUnFormattedContainer
    //   onHandleCloseWindow={onHandleCloseWindow}
    //   containerStyle={{
    //     zIndex: 15,
    //     top: '5%',
    //     left: '5%',
    //     height: '90%',
    //     width: '90%',
    //   }}
    // >
    //   <Form ref={formRef} onSubmit={handleEditGuest}>
    //     <Container>
    //       <Header>
    //         <h1>
    //           Formulário de Convidado | {guest.first_name} {guest.last_name}
    //         </h1>
    //       </Header>
    //       <Body>
    //         <Section>
    //           <InputContainer>
    //             <p>Nome:</p>
    //             {!guest.weplanGuest ? (
    //               <Input
    //                 defaultValue={guest.first_name}
    //                 name="first_name"
    //                 type="text"
    //               />
    //             ) : (
    //               <h3>{guest.first_name}</h3>
    //             )}
    //           </InputContainer>
    //           <InputContainer>
    //             <p>Sobrenome:</p>
    //             {!guest.weplanGuest ? (
    //               <Input
    //                 defaultValue={guest.last_name}
    //                 name="last_name"
    //                 type="text"
    //               />
    //             ) : (
    //               <h3>{guest.last_name}</h3>
    //             )}
    //           </InputContainer>
    //           <InfoInputContainer>
    //             <p>Descrição:</p>
    //             <Input
    //               defaultValue={guest.description}
    //               name="description"
    //               type="text"
    //             />
    //           </InfoInputContainer>

    //           <ButtonContainer>
    //             {!guest.confirmed ? (
    //               <button type="button" onClick={updateGuestConfirmation}>
    //                 Não confirmado
    //               </button>
    //             ) : (
    //               <button type="button" onClick={updateGuestConfirmation}>
    //                 <MdFavorite />
    //                 Confirmado!
    //               </button>
    //             )}
    //             {!guest.weplanGuest && (
    //               <button
    //                 type="button"
    //                 onClick={() => setSelectFriendWindow(true)}
    //               >
    //                 Associar a um usuário WePlan ?
    //               </button>
    //             )}
    //           </ButtonContainer>
    //           {guest.weplanGuest && guest.weplanGuest.weplanUserGuest && (
    //             <button type="button" onClick={deleteWeplanGuestAssociation}>
    //               Deletar usuário WePlan associado a convidado
    //             </button>
    //           )}
    //         </Section>
    //         <Section>
    //           <h2>Informações de contato</h2>
    //           <InfoSection>
    //             <InfoInputContainer>
    //               <p>
    //                 Whatsapp:
    //                 {whatsappField && (
    //                   <button
    //                     type="button"
    //                     onClick={() => setWhatsappField(false)}
    //                   >
    //                     <MdArrowBack />
    //                     <MdArrowBack />
    //                   </button>
    //                 )}
    //               </p>
    //               {!whatsappField ? (
    //                 <button
    //                   type="button"
    //                   onClick={() => setWhatsappField(!whatsappField)}
    //                 >
    //                   {guestDefaultWhatsapp === 'n/a'
    //                     ? 'Informar'
    //                     : guestDefaultWhatsapp}
    //                 </button>
    //               ) : (
    //                 <Input
    //                   name="whatsapp"
    //                   placeholder={guestDefaultWhatsapp}
    //                 />
    //               )}
    //             </InfoInputContainer>
    //             <InfoInputContainer>
    //               <p>
    //                 Telefone:
    //                 {phoneField && (
    //                   <button
    //                     type="button"
    //                     onClick={() => setPhoneField(false)}
    //                   >
    //                     <MdArrowBack />
    //                     <MdArrowBack />
    //                   </button>
    //                 )}
    //               </p>
    //               {!phoneField ? (
    //                 <button
    //                   type="button"
    //                   onClick={() => setPhoneField(!phoneField)}
    //                 >
    //                   {guestDefaultPhone === 'n/a'
    //                     ? 'Informar'
    //                     : guestDefaultPhone}
    //                 </button>
    //               ) : (
    //                 <Input name="phone" placeholder={guestDefaultPhone} />
    //               )}
    //             </InfoInputContainer>
    //             <InfoInputContainer>
    //               <p>
    //                 email:
    //                 {emailField && (
    //                   <button
    //                     type="button"
    //                     onClick={() => setEmailField(false)}
    //                   >
    //                     <MdArrowBack />
    //                     <MdArrowBack />
    //                   </button>
    //                 )}
    //               </p>
    //               {!emailField ? (
    //                 <button
    //                   type="button"
    //                   onClick={() => setEmailField(!emailField)}
    //                 >
    //                   {guestDefaultEmail === 'n/a'
    //                     ? 'Informar'
    //                     : guestDefaultEmail}
    //                 </button>
    //               ) : (
    //                 <Input name="email" placeholder={guestDefaultEmail} />
    //               )}
    //             </InfoInputContainer>
    //           </InfoSection>
    //           <InfoInputContainer>
    //             <p>
    //               Endereço:
    //               {addressField && (
    //                 <button
    //                   type="button"
    //                   onClick={() => setAddressField(false)}
    //                 >
    //                   <MdArrowBack size={24} />
    //                   <MdArrowBack size={24} />
    //                 </button>
    //               )}
    //             </p>
    //             {!addressField ? (
    //               <button
    //                 type="button"
    //                 onClick={() => setAddressField(!addressField)}
    //               >
    //                 {guestDefaultAddress === 'n/a'
    //                   ? 'Informar'
    //                   : guestDefaultAddress}
    //               </button>
    //             ) : (
    //               <Input name="address" placeholder={guestDefaultAddress} />
    //             )}
    //           </InfoInputContainer>
    //         </Section>
    //       </Body>

    //       <button type="submit">
    //         <h3>Salvar</h3>
    //       </button>

    //       <button type="button" onClick={handleDeleteGuest}>
    //         <h3>Deletar</h3>
    //       </button>
    //     </Container>
    //   </Form>
    // </WindowUnFormattedContainer>
  );
};

export default WeplanUserProfileWindow;
