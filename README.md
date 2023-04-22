# Ai-web-asystent

## Krótki opis projektu
##### Projekt AI Web Asystent to aplikacja oparta na frameworku Flask, która pozwala na komunikację z modelem języka GPT-4 w formie czatu tekstowego i głosowego. Użytkownik może zadawać pytania, a aplikacja generuje odpowiedzi za pomocą GPT-4. Asystent obsługuje komunikację tekstową oraz rozpoznawanie i syntezę mowy.


# Instrukcja instalacji środowiska
#### Aby skonfigurować i uruchomić projekt, wykonaj poniższe kroki:

## Upewnij się, że masz zainstalowane Python 3.9 lub nowszy.
#### Zainstaluj wirtualne środowisko:

```
python -m venv ai_web_asystent_env
```
## Aktywuj wirtualne środowisko:

### Windows: ai_web_asystent_env\Scripts\activate
### Linux/macOS: source ai_web_asystent_env/bin/activate
### Zainstaluj wymagane pakiety:
```
pip install -r requirements.txt
```
## Wygeneruj certyfikat samopodpisany dla obsługi HTTPS:
```
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```
#### Upewnij się, że masz odpowiednie credentiale dla API GPT-4 i umieść je w pliku openai_secret_manager.py.

## Instrukcja uruchomienia aplikacji

### Aktywuj wirtualne środowisko (jeśli nie jest już aktywne):
- #### Windows: ai_web_asystent_env\Scripts\activate
- #### Linux/macOS: source ai_web_asystent_env/bin/activate
## Uruchom aplikację:
```
python app.py
```
# Otwórz przeglądarkę i przejdź do adresu: https://localhost:5000.
## Teraz aplikacja powinna być uruchomiona, a użytkownik może zacząć zadawać pytania tekstowe lub mówić do mikrofonu, aby otrzymać odpowiedzi od GPT-4.
