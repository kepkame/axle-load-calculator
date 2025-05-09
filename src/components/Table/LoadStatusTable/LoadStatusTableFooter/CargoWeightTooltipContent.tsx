export const CargoWeightTooltipContent: React.FC = () => {
  return (
    <>
      <p>
        Значение лимита рассчитывается по числу осей транспортного средства согласно «
        <a
          href="https://www.consultant.ru/document/cons_doc_LAW_371981/dc0b702a4a0f964a66bc78569c0732a00401cc5d/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ПП РФ № 2200 от 21.12.2020
        </a>
        ».
      </p>

      <table>
        <tbody>
          <tr>
            <td>Трехосные: </td>
            <td>28 т.</td>
          </tr>
          <tr>
            <td>Четырехосные: </td>
            <td>36 т.</td>
          </tr>
          <tr>
            <td>Пятиосные: </td>
            <td>40 т.</td>
          </tr>
          <tr>
            <td>Шестиосные и более: </td>
            <td>44 т.</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
