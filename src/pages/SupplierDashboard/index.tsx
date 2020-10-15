import React, { useCallback, useState } from 'react';

import {
  Container,
  Content,
  Modules,
  ModuleTitle,
  UpperPage,
  MiddlePage,
  BottomPage,
} from './styles';

import SupplierPageHeader from '../../components/SupplierPageHeader';
import Funnel from '../../components/Funnel';

const SupplierDashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState(true);
  const [modulesMenu, setModulesMenu] = useState(true);
  const [comercialSection, setComercialSection] = useState(false);
  const [productionSection, setProductionSection] = useState(false);
  const [projectSection, setProjectSection] = useState(false);
  const [humanResourcesSection, setHumanResourcesSection] = useState(false);
  const [financeSection, setFinanceSection] = useState(false);
  const [title, setTitle] = useState('Dashboard');

  const closeAllWindows = useCallback(() => {
    setDashboard(false);
    setComercialSection(false);
    setProductionSection(false);
    setProjectSection(false);
    setHumanResourcesSection(false);
    setFinanceSection(false);
  }, []);
  const handleChangeModule = useCallback(
    (props: string) => {
      closeAllWindows();
      setTitle(props);
      if (props === 'Dashboard') {
        setDashboard(true);
      }
      if (props === 'Comercial') {
        setComercialSection(true);
      }
      if (props === 'Produção') {
        setProductionSection(true);
      }
      if (props === 'Projetos') {
        setProjectSection(true);
      }
      if (props === 'Colaboradores') {
        setHumanResourcesSection(true);
      }
      if (props === 'Financeiro') {
        setFinanceSection(true);
      }
    },
    [closeAllWindows],
  );

  return (
    <Container>
      <SupplierPageHeader
        handleModulesMenu={() => setModulesMenu(!modulesMenu)}
        module={title}
        modulesMenu={modulesMenu}
      />
      <Content>
        {!!modulesMenu && (
          <Modules>
            <button
              type="button"
              onClick={() => handleChangeModule('Dashboard')}
            >
              <ModuleTitle isActive={title === 'Dashboard'}>
                <strong>Dashboard</strong>
              </ModuleTitle>
            </button>
            <button
              type="button"
              onClick={() => handleChangeModule('Comercial')}
            >
              <ModuleTitle isActive={title === 'Comercial'}>
                <strong>Comercial</strong>
              </ModuleTitle>
            </button>
            <button
              type="button"
              onClick={() => handleChangeModule('Produção')}
            >
              <ModuleTitle isActive={title === 'Produção'}>
                <strong>Produção</strong>
              </ModuleTitle>
            </button>
            <button
              type="button"
              onClick={() => handleChangeModule('Projetos')}
            >
              <ModuleTitle isActive={title === 'Projetos'}>
                <strong>Projetos</strong>
              </ModuleTitle>
            </button>
          </Modules>
        )}

        <UpperPage>
          <div>
            <h3>KPI_1</h3>
            <span>x</span>
          </div>
          <div>
            <h3>KPI_2</h3>
            <span>x</span>
          </div>
          <div>
            <h3>KPI_3</h3>
            <span>x</span>
          </div>
          <div>
            <h3>KPI_4</h3>
            <span>x</span>
          </div>
          <div>
            <h3>KPI_5</h3>
            <span>x</span>
          </div>
        </UpperPage>
        <MiddlePage>
          {!!dashboard && (
            <Funnel>
              <h1>Dashboard</h1>
            </Funnel>
          )}
          {!!comercialSection && (
            <Funnel>
              <h1>CRM Funnel</h1>
            </Funnel>
          )}
          {!!productionSection && (
            <Funnel>
              <h1>Production Funnel</h1>
            </Funnel>
          )}
          {!!projectSection && (
            <Funnel>
              <h1>Project Funnel</h1>
            </Funnel>
          )}
          {!!humanResourcesSection && (
            <Funnel>
              <h1>HR Section</h1>
            </Funnel>
          )}
          {!!financeSection && (
            <Funnel>
              <h1>Finance Funnel</h1>
            </Funnel>
          )}
        </MiddlePage>

        <BottomPage>
          <button type="button">
            <ModuleTitle isActive={title === 'Tarefas'}>
              <strong>Tarefas</strong>
            </ModuleTitle>
          </button>
          <button type="button">
            <ModuleTitle isActive={title === 'Performance'}>
              <strong>Performance</strong>
            </ModuleTitle>
          </button>
          <button type="button" onClick={() => handleChangeModule('Pessoal')}>
            <ModuleTitle isActive={title === 'Pessoal'}>
              <strong>Pessoal</strong>
            </ModuleTitle>
          </button>
          <button
            type="button"
            onClick={() => handleChangeModule('Financeiro')}
          >
            <ModuleTitle isActive={title === 'Financeiro'}>
              <strong>Financeiro</strong>
            </ModuleTitle>
          </button>
        </BottomPage>
      </Content>
    </Container>
  );
};

export default SupplierDashboard;
