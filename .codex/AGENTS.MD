## Wytyczne dla agenta

- W projekcie, w którym wykorzystujemy bibliotekę, pliki PDF i schematy (schema) są przechowywane w bazie danych i wczytywane później. Zawsze, gdy wprowadzasz zmiany, upewnij się, że będą one współgrały z istniejącymi już w bazie schematami.
- Jeśli otrzymasz od użytkownika nowe poprawki lub dodatkowe wytyczne w trakcie pracy, zaktualizuj ten plik (agents.md), aby zawierał te nowe wskazówki.

### Wytyczne optymalizacyjne
- Preferuj `rg` (ripgrep) lub `git grep` zamiast `grep -R` dla szybszych wyszukiwań.
- Ogranicz zakres wyszukiwania do konkretnych katalogów, gdy to możliwe.
- Wykorzystaj narzędzia równoległe lub z wbudowanym cache'em dla wielokrotnych operacji.
- Ignoruj foldery `node_modules`.
