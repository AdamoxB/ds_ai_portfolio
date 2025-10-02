import streamlit as st
import pandas as pd
import numpy as np
from pycaret.datasets import get_data
from pycaret.classification import setup as cl_setup, compare_models as cl_compare_models, create_model as cl_create_model, plot_model as cl_plot_model, finalize_model as cl_finalize_model, save_model as cl_finalize_model, load_model as cl_load_model, predict_model as cl_predict_model, pull, ClassificationExperiment
from pycaret.regression import setup as re_setup, compare_models as re_compare_models, create_model as re_create_model, plot_model as re_plot_model, finalize_model as re_finalize_model, save_model as re_save_model, load_model as re_load_model, predict_model as re_predict_model, pull
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix
import seaborn as sns
import os
import io
import shutil
import time
from pycaret.time_series import TSForecastingExperiment#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
st.set_page_config(layout='wide')

# Funkcja do wczytania danych
def load_data(uploaded_file, sep):
    if uploaded_file is not None:
        if uploaded_file.name.endswith('.csv'):
            return pd.read_csv(uploaded_file, sep=sep)
        elif uploaded_file.name.endswith('.json'):
            return pd.read_json(uploaded_file)
        elif uploaded_file.name.endswith('.xls') or uploaded_file.name.endswith('.xlsx'):
            return pd.read_excel(uploaded_file)
    return None


# import streamlit as st
# import matplotlib.pyplot as plt
# import io

def toss(model, plot_type, session_key):
    # Tworzenie wykresu
    fig, ax = plt.subplots()
    cl_plot_model(model, plot=plot_type, display_format="streamlit")

    # Zapisywanie wykresu do BytesIO
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    st.session_state[session_key] = buf.getvalue()

    # Wyświetlanie wykresu z session_state
    if session_key in st.session_state:
        st.image(st.session_state[session_key])

# Przykład użycia
# toss(cl_best_model, plot='confusion_matrix', session_key='confusion_matrix')


#==========================================================================================

# Strona główna
st.title("Analiza Kluczowych Cech w Zbiorach Danych")



# Sidebar
st.sidebar.title("Opcje")
uploaded_file = st.sidebar.file_uploader("1. Wybierz plik", type=["csv", "json", "xls", "xlsx"])
# sep = st.sidebar.selectbox("Wybierz separator, / ; / tab /spacja", [",", ";", "\t", " "])
#if st.sidebar.selectbox("I:",["f"]) == "f"





with st.sidebar:
    #st.text_input.__annotations__
    col1, col2 = st.columns(2)
    with col1:
        tab = st.radio("przecinek/tabulacja:", [",", "	"])
    with col2:
        sep = st.text_input("Podaj własny separator", tab)
    
    
    #sep = st.sidebar.selectbox("Wybierz z listy typ separatora użytego w pliku", [",", ":",st.text_input("dodaj do listy dowolny separator")])
    

#expand = st.expander("My label", icon=":material/info:")
    nrproc = st.number_input("Ile procent losowego dataframe wziąć do analizy", 0, 100, 100)
    st.metric("My metric", 42, 2)



st.radio("Pick one", ["cats", "dogs"])
st.radio("Select one:", [1, 2])
#-----------------------------------------------------------------------------------------------------
#__________________________________________________________________________________________


# #==========================================================================================================================================
# y = get_data('airline', verbose=False)
# # Experiment
# exp = TSForecastingExperiment()
# exp.setup(data=y, fh=12, verbose=False)

# if st.button("Run Time series models:"):
#     best_model = exp.compare_models(include=['arima','exp_smooth','ets'], verbose=False)
#     #Pull metrics
#     metrics = exp.pull()
#     st.write(metrics)
    
#     # Plot graph
#     st.write(f"Oto tabelka") 
#     exp.plot_model(estimator=best_model, display_format='streamlit')
# #==========================================================================================================================================



#tab1, tab2 = st.tabs([1, 2])
# tab1, tab2 = st.tabs(["Tab 1", "Tab2"])
# with tab1:
#     st.write("this is tab 1")
# tab2.write("this is tab 2")
# n_rows_first = st.sidebar.number_input("Ile pierwszych wierszy do analizy?", min_value=1, max_value=100, value=10)
# n_rows_random = st.sidebar.number_input("Ile losowych wierszy do analizy?", min_value=1, max_value=100, value=10)



# st.write("Oto pierwsze 5 losowych wierszy z pliku:")
# st.write(df.sample(5))


# Logika aplikacji
if uploaded_file:   
    df = load_data(uploaded_file, sep)

    nr=nrproc#ile % data frame frame do trenowania
    min_df  = df.sample(round((nr/100)*len(df)))
    
    columns_to_ignore = st.multiselect('Ignorowane Kolumny', df.columns.tolist())
    if df is not None:
        
        if len(df.columns)<2:
            st.warning('Ustaw seprator!')
            # st.write(df.sample(2))
        else:
            st.info('Ustawiłeś separator poprawnie :)')
            # st.write(df.sample(2))
            #2. wybór kolumny
            kolumna1 = st.sidebar.selectbox('[ 2 ] Wybierz badaną kolumnę odniesienia ', df.columns)#options=[]).tolist()
            st.markdown(f"<span style='color: #007BFF;'>Załadowałeś plik <strong style='font-size: 20px;'>{uploaded_file.name}</strong>, wybrałeś kolumnę <strong style='font-size: 20px;'>{kolumna1}</strong>wybrany przez ciebie serparator <strong style='font-size: 20px;'>[ {sep} ]</strong> umożliwiia ponmiższą identyfikacje kolumn</span>", unsafe_allow_html=True)
            
            def problem_type(df):
                if df.select_dtypes(include='object').shape[1] > 0:#weryfikacji obecności kolumn tekstowych w DataFrame
                    return "Klasyfikacja"
                else:
                    return "Regresja"
            info = problem_type(df)
            st.write(f"Typ problemu: {info}")  


                                
            tab1, tab2, tab3 = st.tabs(["losowe wiersze", "Brakujące dane", f"Setup : {info}"])

            with tab1:
                st.header("losowe wiersze")
                with st.expander(f">Oto 10 losowych wierszy"):
                    # st.markdown(f"<span style='color: #28A745;'>Oto pierwsze 10 losowych wierszy z pośród <strong style='font-size: 20px;'>{len(min_df)}</strong> wierszy i <strong style='font-size: 20px;'>{len(min_df.columns)}</strong> kolumn wczytanych danych</span>", unsafe_allow_html=True)
                    st.dataframe(min_df.sample(10))
                    
            with tab2:
                # with st.expander("Brakujące dane w %"):
                #     st.write(df.isna().sum() / len(df) * 100) 
                taba, tabb = st.tabs(["Brakujące dane w %", "typy danych w kolumnach"])
                with taba:
                    with st.expander("Brakujące dane w %"):
                        st.write(min_df.isna().sum() / len(min_df) * 100) 
                with tabb:
                    buffer = pd.io.common.StringIO()
                    min_df.info(buf=buffer)
                    s = buffer.getvalue()

                    st.text(s)  # Wyświetl zawartość df.info()
                    st.text(f"----------------------------------------------------------") 
                    st.write(f"unikatowe wartości :") 
                    st.write(min_df.nunique()) 
                    st.write(min_df.describe().round(2).T)
            with tab3:
                # nr=nrproc#ile % data frame frame do trenowania
                # min_df  = df.sample(round((nr/100)*len(df)))
                cl_setup(
                    data=min_df,
                    target=kolumna1,
                    session_id=123,
                    ignore_features=columns_to_ignore,#['Name', 'Ticket', 'Cabin', 'PassengerId'],
                    fix_imbalance=True,
                    normalize=True,
                    transformation=True,
                    verbose=False,
                )

#===========================================================================================
#================
                # titanic_df = get_data('titanic', verbose=False)
                # Experiment
                exp = ClassificationExperiment()
                exp.setup(
                    data=min_df,
                    target=kolumna1,
                    session_id=123,
                    ignore_features=columns_to_ignore,#['Name', 'Ticket', 'Cabin', 'PassengerId'],
                    fix_imbalance=True,
                    normalize=True,
                    transformation=True,
                    verbose=False,
                )
                if 'metrics' not in st.session_state:
                    st.session_state.metrics = None
                   
                wybor = {
                    "kompleksowy": {},
                    "szybki okrojony": {'include': ['rf', 'lr', 'gbc', 'knn'], 'fold': 5, 'verbose': False}
                }

                conf_compare = st.radio("zakres porównanania modeli ", list(wybor.keys()))
                if st.button("Run Time series models:"):

                    cl_best_model = exp.compare_models(**wybor[conf_compare])##include=['arima','exp_smooth','ets'], verbose=False
                    #Pull metrics
                   
                    st.session_state.cl_best_model = cl_best_model

                    

                    metrics = exp.pull()

                    # Przechowanie metryk w session_state


                    st.session_state.metrics = metrics
                        
                    # Wyświetlenie metryk <<<<< print
                    st.write(st.session_state.metrics)

                    # kasuj stare pliki na dysku
                    file_names = ['Feature Importance.png', 'Confusion Matrix.png', 'AUC.png']

                    for file_name in file_names:
                        try:
                            os.remove(file_name)
                            print(f"Usunięto: {file_name}")
                        except FileNotFoundError:
                            print(f"Plik nie znaleziony: {file_name}")
                        except Exception as e:
                            print(f"Zdarzył się błąd przy usuwaniu pliku {file_name}: {e}")
                    #st.write(metrics)#st.write <<<<< print
                    # Plot graph
                    # if hasattr(cl_best_model, 'auc'):
                    #     exp.plot_model(estimator=cl_best_model, display_format='streamlit')#<<<<, display_format='streamlit')
                    # else:
                    #     st.error('Wygenerowanie wykresu nie jest możliwe.')
                    if hasattr(cl_best_model, 'coef_') or hasattr(cl_best_model, 'feature_importances_'):

                        cl_plot_model(cl_best_model, plot='feature', display_format="streamlit", save=True)
                        cl_FL_plot_name = 'Feature Importance.png'
                        st.image('Feature Importance.png', use_container_width=True)
                    else:
                        st.error(
                    'Wygenerowanie wykresu istotności cech NIE jest możliwe dla tej kolumny. Zmień kolumnę docelową.')
                    cl_plot_model(cl_best_model, plot='confusion_matrix', display_format="streamlit")
                    cl_plot_model(cl_best_model, plot='confusion_matrix', save=True)
                    cl_CM_plot_name = 'Confusion Matrix.png'
                    
                    cl_plot_model(cl_best_model, plot='auc', display_format="streamlit")
                    cl_plot_model(cl_best_model, plot='auc', display_format="streamlit", save=True)
                    cl_FL_plot_name = 'ROC.png'

                    # toss(cl_best_model, plot='confusion_matrix', session_key='confusion_matrix')

                        
                
#===========================================================================================
#===========================================================================================
                # #==========================================================================================================================================
                # # y = get_data('airline', verbose=False)
                # # Experiment
                # exp = TSForecastingExperiment()
                # exp.setup(data=df, fh=12, target=kolumna1, session_id=123, verbose=False)#min_df fh=12,

                # if st.button("Run Time series models:"):
                #     best_model = exp.compare_models(include=['lr','rf','gbc'], verbose=False)#include=['arima', 'exp_smooth','ets'], 
                #     #Pull metrics
                #     metrics = exp.pull()
                #     st.write(metrics)
                    
                #     # Plot graph
                #     st.write(f"Oto tabelka") 
                #     exp.plot_model(estimator=best_model, display_format='streamlit')
                # #==========================================================================================================================================


                tabx, taby = st.tabs([f"Setup : {info}", "ostatni best model"])

                with taby:

                    if st.button("Zapisz modele"):
                        file_names = ['Feature Importance.png', 'Confusion Matrix.png', 'AUC.png']
                        for file_name in file_names:
                            if os.path.exists(file_name):
                                new_file_name = file_name.replace('.png', '{info}_saved.png')
                                shutil.copy(file_name, new_file_name)
                            else:
                                st.warning(f'Brak pliku: {file_name}')

                    if st.button("wczytaj modele"):                      
                        st.write(st.session_state.metrics)
                        file_names = ['Feature Importance_saved.png', 'Confusion Matrix_saved.png', 'AUC_saved.png']
                        for file_name in file_names:
                            if os.path.exists(file_name):
                                st.image(file_name, use_container_width=True)
                            else:
                                st.warning(f'Brak pliku do wyświetlenia : {file_name}')




                    # st.image('Feature Importance.png', use_container_width=True)
                    # st.image('Confusion Matrix.png', use_container_width=True)
                    # st.image('ROC.png', use_container_width=True)
                    


#==============================================================================================================

#==============================================================================================================

                        # exp=TSForecastingExperiment()
                        # exp.cl_setup(data=min_df, fh=12, target=kolumna1, session_id=123, html=False)

                        # if st.button("Run Time series models:"):
                        #     # best = exp.compare_models(include=['arima','exp_smooth','ets'], verbose=False)                            

                        #     best_model = exp.compare_models(verbose=False)
                        #     # Pull metrics
                        #     metrics = exp.pull()
                        #     st.write(metrics)
                            
                        #     # Plot graph
                        #     exp.plot_model(estimator=best_model, display_format='streamlit')








                        # best_model = cl_compare_models(fold=5)
                        # classification_results = pull()
                        # st.write(classification_results )



                        # img = cl_plot_model(best_model, plot="feature", display_format="streamlit", save=True)#!!!!!!!!!!!!!!!!!!!
                        # st.image(img)#!!!!!!!!!!!!!!!!!!!!


                        # def pulla():
                        #     # Dummy example function; replace with actual implementation
                        #     return best_model  # or it could be any data type

                        # # Get the results from pull()
                        # results = pulla()

                        # data = results.to_dict(orient='records')
                        # df_bm = pd.DataFrame(data)
                        # df_bm
                        # st.write("Results:", df_bm)
                        # Display the results using Streamlit's write function




                            # best_model
                            # st.write("Results:", best_model)
                                              






                        # # results = pull()  # Pobiera wyniki z compare_models
                        # # results.reset_index()#drop=True, inplace=True)
                        

                        # clf = cl_setup(data=min_df, target=kolumna1, session_id=123, html=False)
                        # # st.write(f"Setup : {info}, wybrana kolumna : {kolumna1}") 

                        # # st.title("Porównanie modeli")
                        # cl_best_model = cl_compare_models()#(include=['lr', 'rf'], fold=5)
                        # with st.spinner('Czekam...'):
                        #     time.sleep(1)  # Symulacja długiego procesu
                        # results
                        # # results = pull()  # Pobiera wyniki z compare_models
                        # st.success('Gotowe!')

                        # cl_best_model  
                        # st.write(f"Najlepszy model: {cl_best_model}")
                        # # st.title("Porównanie modeli")
                        
                                                           
                       

                        
                        # st.dataframe(cl_best_model)
                        # # results.reset_index()#drop=True, inplace=True)
                        # # display(results)                 
                    
                with tabx:                    
                    st.header("losowe wiersze")
                    st.write(f"Setup : {info}, wybrana kolumna : {kolumna1}") 
                    min_df1 = df.sample(round((nr/100)*len(df)))
                    st.write(f"wierszy {(len(min_df1))} z {(len(df))}") 

                    smodel = st.text_input("Podaj własny separator", "lr")
                    cl_best_model = cl_compare_models(include=[smodel], fold=10)
                    if st.button("Analizuj dane"):  
                        min_df = df.sample(round((nr/100)*len(df)))
                        with st.expander("wyśfietl dane"):
                        
                            st.dataframe(min_df)#WYBRANY DF
                    

                        

                        #st.write(kolumna1)
                        #cl_best_model = st.session_state.cl_best_model
                        #cl_setup(data=min_df, target=kolumna1, session_id=123, html=False)#,ignore_features=['Name', 'Ticket', 'Cabin', 'PassengerId']#           fix_imbalance=True,normalize=True,transformation=True,)
                        #cl_best_model = cl_compare_models(include=['lr','rf','gbc'], verbose=True)#
                        #cl_best_model = cl_create_model('rf')#,'rf')
                        # cl_plot_model(cl_best_model, plot="feature")

                        #best_model = cl_load_model('best_model')  # Upewnij się, że masz model zapisany jako 'best_model'

                        # st.dataframe(cl_best_model)

                        # sprawdzenie czy znaleziony BEST MODEL posiada możliwość generowania wykresu funkcji


                        # Umożliw użytkownikowi wprowadzenie nazwy modelu
                    # model_name = st.text_input("Wprowadź nazwę modelu do wykresu:", value="model_name")

                    # if model_name:
                    #     try:
                    #         # Wyświetl wykres dla wybranego modelu
                    #         cl_plot_model(cl_best_model, model=model_name)
                    #     except ValueError:
                    #         st.error("Podano nieprawidłową nazwę modelu. Upewnij się, że model istnieje.")


                        
                    if hasattr(cl_best_model, 'coef_') or hasattr(cl_best_model, 'feature_importances_'):

                        cl_plot_model(cl_best_model, plot='feature', display_format="streamlit", save=True)
                        # Dodatkowy krok, aby zapisać jako .png
                       



                        cl_generated_plot_name = 'Feature Importance.png'
                        st.image('Feature Importance.png', use_container_width=True)
                    else:
                        st.error(
                        'Wygenerowanie wykresu istotności cech NIE jest możliwe dla tej kolumny. Zmień kolumnę docelową.')
                                            
                    cl_plot_model(cl_best_model, plot='confusion_matrix', display_format="streamlit")
                    cl_plot_model(cl_best_model, plot='auc', display_format="streamlit")
                       
                                    
                                    # cls_plot_image = st.image(cls_new_plot_name, use_container_width=True)

                                # #     if cls_plot_image:
                                # #         st.markdown('#### Opis wykresu:')
                                # #         cls_description = describe_plot(cls_new_plot_name)
                                        
                                # #         # wyświetlenie opisu wykresu
                                # #         st.write(cls_description)
                    
                                # #         # rekomendacje dla klienta
                                # #         if cls_description:
                                # #             st.markdown('#### <span style="color: green;">Rekomendacje:</span>', unsafe_allow_html=True)
                                # #             st.write(generate_recommendations(cls_description))


                            
                
                        # #   Ogólny przegląd danych

                        # df["pclass"].value_counts()#ile razy występuje dana wartość w kolumnie
                                                
                    ### 1.3.  Podstawowe statystyki opisowe



        


                    # # Wyświetl informacje o typie problemu
                    # if target_column:
                    #     is_classification = df[target_column].dtype in ['object', 'category']
                    #     problem_type = "Klasyfikacja" if is_classification else "Regresja"
                    #     st.write(f"Rozpoznany problem: {problem_type}")

                    #     # # Wybór wierszy do analizy
                    #     # data_to_analyze = pd.concat([df.head(n_rows_first), df.sample(n_rows_random)])
                    #     # experiment = setup(data=data_to_analyze, target=target_column, silent=True, verbose=False)
                    #     best_model = compare_models()

                    #     # Generuj wykres najważniejszych cech
                    #     feature_importance = plot_model(best_model, plot='feature')
                    #     plt.title('Ważność Cech')
                    #     st.pyplot()

                    #     # Opis słowny modelu
                    #     model_description = f"Zbudowany model: {best_model}. "
                    #     st.write(model_description)

                    #     # Rekommendacje
                    #     recommendations = "Rozważ dodanie więcej danych lub przemyślenie inżynierii cech."
                    #     st.write("Rekomendacje:", recommendations)

















# Uniwersalne zestawy kolorów dla czarnego i białego tła:

# Niebieski: #007BFF (średni niebieski)
# Zielony: #28A745 (żywy zielony)
# Czerwony: #DC3545 (intensywny czerwony)
# Żółty: #FFC107 (słoneczny żółty)
# Fioletowy: #6F42C1 (głęboki fiolet)
# Te kolory powinny dobrze wyglądać zarówno na czarnym, jak i białym tle.