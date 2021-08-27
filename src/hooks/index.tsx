import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ThemeModeProvider } from './theme';
import { EventProvider } from './event';
import { FriendsProvider } from './friends';
import { EventVariablesProvider } from './eventVariables';
import { CurrentEventProvider } from './currentEvent';
import { EventSuppliersProvider } from './eventSuppliers';
import { NoteProvider } from './notes';
import { FilesProvider } from './files';
import { EventGuestsProvider } from './eventGuests';
import { EventTasksProvider } from './eventTasks';
import { EventOwnersProvider } from './eventOwners';
import { EventMembersProvider } from './eventMembers';
import { TransactionProvider } from './transactions';

const AppProvider: React.FC = ({ children }) => (
  <ThemeModeProvider>
    <AuthProvider>
      <ToastProvider>
        <FriendsProvider>
          <EventProvider>
            <EventVariablesProvider>
              <CurrentEventProvider>
                <NoteProvider>
                  <FilesProvider>
                    <EventGuestsProvider>
                      <EventTasksProvider>
                        <EventSuppliersProvider>
                          <EventOwnersProvider>
                            <EventMembersProvider>
                              <TransactionProvider>
                                {children}
                              </TransactionProvider>
                            </EventMembersProvider>
                          </EventOwnersProvider>
                        </EventSuppliersProvider>
                      </EventTasksProvider>
                    </EventGuestsProvider>
                  </FilesProvider>
                </NoteProvider>
              </CurrentEventProvider>
            </EventVariablesProvider>
          </EventProvider>
        </FriendsProvider>
      </ToastProvider>
    </AuthProvider>
  </ThemeModeProvider>
);

export default AppProvider;
